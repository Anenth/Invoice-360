/*global define*/

define([
	'underscore',
	'backbone',
	'models/Invoice',
	'config'
	], function (_, Backbone, InvoiceModel, config) {
		'use strict';

		var InvoiceCollection = Backbone.Collection.extend({
			model: InvoiceModel,
			url: function(){
				return config.url + '/invoice';
			},
		});

		return InvoiceCollection;
	});