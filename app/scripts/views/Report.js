/*global define*/

define([
	'jquery',
	'underscore',
	'backbone',
	'templates',
	'models/MainReport',
	'collections/ChartData',
	'chartjs'
	], function ($, _, Backbone, JST, SalesReports, ChartData) {
		'use strict';
		
		var compileChartData = function(data){
			var labels = [], amount =[], chartData=[];
			for(var i in data){
				labels.push(data[i].date);
				amount.push(data[i].amount);
			}
			chartData = ({
				'labels'	: labels,
				'datasets'	: [{
					'fillColor'			: 'rgba(243, 156, 18, 0.3)',
					'strokeColor'		: 'rgba(243, 156, 18, .7)',
					'pointColor'		: 'rgba(243, 156, 18, .9)',
					'pointStrokeColor'	: '#fff',
					'data'				: amount
				}]
			});
			return chartData;
		};
		var ReportView = Backbone.View.extend({
			el:'.mainContainer',
			template: JST['app/scripts/templates/Report.ejs'],
			model: new SalesReports(),
			collection: new ChartData(),
			render:function(){
				var _this = this;
				if(navigator.onLine){
					this.model.fetch({
						success:function(data){
							_this.$el.append(_this.template(data.toJSON()));
							_this.showChart();
						},
						error:function(){
							console.log('Some error where fetching the reports!');
						}
					});
				}else{
					_this.$el.append(_this.template(this.model.fetch()));
					_this.showChart();
				}
			},
			showChart:function(){
				var chartData, ctx, chart;
				ctx = $('#myChart').get(0).getContext('2d');

				if(!navigator.onLine){
					this.collection.fetch({
						success:function(data){
							chartData = compileChartData(data.toJSON());
							chart     = new Chart(ctx).Line(chartData);
						},
						error:function(){
							console.log('Some error where fetching the ChartData!');
						}
					});
				}else{
					chartData = compileChartData(this.collection.fetch());
					chart     = new Chart(ctx).Line(chartData);
				}
			}
		});

return ReportView;
});