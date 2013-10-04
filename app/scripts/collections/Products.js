/*global define*/

define([
	'underscore',
	'backbone',
	'models/Product'
	], function (_, Backbone, ProductModel) {
		'use strict';

		var ProductsCollection = Backbone.Collection.extend({
			model: ProductModel,
			url: 'http://127.0.0.1:8889/product',
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
