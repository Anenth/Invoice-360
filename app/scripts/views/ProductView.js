/*global define*/

define([
	'jquery',
	'underscore',
	'backbone',
	'templates',
	'models/Product'
	], function ($, _, Backbone, JST, Product) {
		'use strict';

		var ProductView = Backbone.View.extend({
			el: '#addProduct',
			events:{
				'submit' : 'addProduct'
			},
			initialize: function(){
			},
			addProduct: function(e){
				e.preventDefault();
				var _this    = this,
				product      = new Product(),
				productName  = $('#inputName'),
				productQty   = $('#inputQty'),
				productPrice = $('#inputPrice');
				product.save({
					name: productName.val(),
					price: productPrice.val(),
					qty : productQty.val()
				},{
					success: function(){
						_this.trigger('Message', productName.val() + ' has been added');
						productName.val('');
						productQty.val('');
						productPrice.val('');
						
					},
					error:function(){
						console.log('Some problem in saving Product to DB');
					}
				}
				);
			}

        // template: JST['app/scripts/templates/ProductView.ejs']
    });

		return ProductView;
	});