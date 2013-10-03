/*global define*/

define([
	'underscore',
	'backbone'
	], function (_, Backbone) {
		'use strict';

		var MainreportModel = Backbone.Model.extend({
			defaults: {
				salesToday: 0 ,
				salesThisWeek: 0 ,
				salesThisMonth: 0 ,
				salesThisYear: 0
			},
			url: 'http://127.0.0.1:8889/report'
		});

		return MainreportModel;
	});