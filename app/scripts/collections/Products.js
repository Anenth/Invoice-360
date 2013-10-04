/*global define*/

define([
	'underscore',
	'backbone',
	'models/Product',
	'config'
	], function (_, Backbone, ProductModel, config) {
		'use strict';

		var ProductsCollection = Backbone.Collection.extend({
			model: ProductModel,
			url : function(){
				return config.url + '/product';
			},
			fetch:function(options){
				if(navigator.onLine){
					return Backbone.Collection.prototype.fetch.apply(this, arguments) ;
				}else{
					return (JSON.parse(localStorage.getItem('products')));
				}

			},
			parse: function(response){
				localStorage.setItem('products', JSON.stringify(response));
				return response;
			}
		});
		return ProductsCollection;
	});
