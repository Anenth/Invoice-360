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
			fetch:function(options){
				if(!navigator.onLine){
					return Backbone.Collection.prototype.fetch.apply(this, arguments) ;
				}else{
					return (JSON.parse(localStorage.getItem('ChartData')));
				}
			},
			parse: function(response){
				localStorage.setItem('ChartData', JSON.stringify(response));
				return response;
			}
		});

		return ChartdataCollection;
	});