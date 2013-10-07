/*global define*/

define([
	'underscore',
	'backbone',
	'config'
	], function (_, Backbone, config) {
		'use strict';

		var OfflineModel = Backbone.Model.extend({
			defaults: {
				products: null,
				invoice: null
			},
			url : function(){
				return config.url + '/offline';
			},
		});

		return OfflineModel;
	});