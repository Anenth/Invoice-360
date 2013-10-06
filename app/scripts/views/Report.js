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
				this.model.fetch({
					success:function(data){
						_this.$el.append(_this.template(data.toJSON()));
						_this.showChart();
					},
					error:function(){
						console.log('Some error where fetching the reports!');
					}
				});
			},
			showChart:function(){
				this.collection.fetch({
					success:function(data){
						var chartData, ctx, chart;
						chartData = compileChartData(data.toJSON());
						ctx       = $('#myChart').get(0).getContext('2d');
						var tooltipDefaults = {
						    background: 'rgba(0,0,0,0.6)',
						    fontFamily : "'Arial'",
						    fontStyle : "normal",
						    fontColor: 'white',
						    fontSize: '12px',
						    padding: {
						        top: 10,
						        right: 10,
						        bottom: 10,
						        left: 10
						    },
						    offset: {
						        left: 0,
						        top: 0
						    },
						    border: {
						        width: 0,
						        color: '#000'
						    }
						};
						chart     = new Chart(ctx).Line(chartData);
					},
					error:function(){
						console.log('Some error where fetching the ChartData!');
					}
				});
			}
		});

		return ReportView;
	});