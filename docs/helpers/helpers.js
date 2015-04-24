"use strict";
var ddata = require("ddata");
var a = require("array-tools");
var handlebars = require("stream-handlebars");

exports.groupBy = groupBy;

function groupBy(groupByFields, options){
	return handlebars.helpers.each(_groupChildren.call(this, groupByFields, options), options); // jshint ignore:line
}

function _addGroup(identifiers, groupByFields){
	return identifiers.map(function(identifier){
		identifier._group = groupByFields.map(function(field){
			return typeof identifier[field] === "undefined" ? null : identifier[field];
		});
		return identifier;
	});
}

function _groupChildren(groupByFields, options){
	var children = ddata._children.call(this, options); // jshint ignore:line
	return _groupBy(children, groupByFields);
}

function transformGroupName(group) {
	switch (group) {
		case 'function': return 'methods';
		case 'class':    return 'classes';
		case 'member':   return 'properties';
	}
	return group;
}

function _groupBy(identifiers, groupByFields){
	/* don't modify the input array */
	groupByFields = groupByFields.slice(0);

	groupByFields.forEach(function(group){
		var groupValues = a.unique(identifiers.filter(function (identifier) {
			/* exclude constructors from grouping.. re-implement to work off a `null` group value */
			return identifier.kind !== "constructor";
		}).map(function(i){ return i[group]; }));
		if (groupValues.length <= 1) { groupByFields = a.without(groupByFields, group) }
	});

	//console.warn(groupByFields);

	identifiers = _addGroup(identifiers, groupByFields)
		.filter(function (identifier) { // TODO: extract this out of the groupBy functionality
			/* exclude inherited properties */
			return !identifier.inherited;
		});

	var inserts = [];
	var prevGroup = [];
	identifiers.forEach(function(identifier, index){
		if (!deepEqual(identifier._group, prevGroup)){
			var groupTitle = identifier._group.reduce(function (base, gr) { return base + transformGroupName(gr) + " " }, "");
			inserts.push({
				index: index,
				_title: groupTitle
			});
		}
		prevGroup = identifier._group;
		delete identifier._group;
	});

	/* insert title items */
	inserts.reverse().forEach(function(insert){
		identifiers.splice(insert.index, 0, { _title: insert._title });
	});
	return identifiers;
}

function deepEqual(a, b){
	return JSON.stringify(a) === JSON.stringify(b);
}
