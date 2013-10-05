/*global define*/

define([
	'jquery',
	'underscore',
	'backbone',
	'templates',
	'models/MainReport',
	'collections/Invoice'
	], function ($, _, Backbone, JST, SalesReports, Invoice) {
		'use strict';

		var ReportView = Backbone.View.extend({
			el:'.mainContainer',
			template: JST['app/scripts/templates/Report.ejs'],
			model: new SalesReports(),
			collection: new Invoice(),
			render:function(){
				var _this = this;
				this.model.fetch({
					success:function(data){
						_this.$el.append(_this.template(data.toJSON()));
					},
					error:function(){
						console.log('Some error where fetching the reports!');
					}
				});
			}
		});

		return ReportView;
	});