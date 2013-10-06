/*global define*/

define([
	'underscore',
	'backbone',
	'config'
	], function (_, Backbone, config) {
		'use strict';

		var ChartdataCollection = Backbone.Collection.extend({
			url : function(){
				return config.url + '/chartdata';
			},
		});

		return ChartdataCollection;
	});