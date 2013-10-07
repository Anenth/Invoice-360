/*global define*/

define([
	'underscore',
	'backbone',
	'config'
	], function (_, Backbone, config) {
		'use strict';

		var MainreportModel = Backbone.Model.extend({
			defaults: {
				salesToday: 0 ,
				salesThisWeek: 0 ,
				salesThisMonth: 0 ,
				salesThisYear: 0
			},
			url : function(){
				return config.url + '/report';
			},
			fetch:function(options){
				if(navigator.onLine){
					return Backbone.Model.prototype.fetch.apply(this, arguments) ;
				}else{
					return (JSON.parse(localStorage.getItem('MainReport')));
				}
			},
			parse: function(response){
				localStorage.setItem('MainReport', JSON.stringify(response));
				return response;
			}
		});

		return MainreportModel;
	});