/*global define*/

define([
	'jquery',
	'underscore',
	'backbone',
	'templates',
	'models/Product',
	'collections/Products',
	'typeahead',
	'models/InvoiceItem',
	'collections/InoviceItems',
	'views/InvoiceItem'
	], function ( $, _, Backbone, JST, Product, Products, typeahead, InvoiceItem, InvoiceItems, InvoiceItemsView) {
		'use strict';
		var invoiceItems = new InvoiceItems();
		var invoiceItemsView = new InvoiceItemsView({collection : invoiceItems});
		var SearchView = Backbone.View.extend({
			el:'.mainContainer',
			template: JST['app/scripts/templates/Search.ejs'],
			collection: new Products(),
			events:{
				'typeahead:autocompleted':'addToTable',
				'typeahead:selected'	 :'addToTable',
				'click .btn-print'		 :'print',
				'click .btn-cancel'		 :'removeItems'
			},
			initialize: function(){
				this.render();
				$('.invoiceItemsContainer').hide();
				this.collection.fetch({
					success: function(data){
						$('#SerachProduct').typeahead({
							name    : 'products',
							valueKey: 'name',
							local   : data.toJSON(),
							template: JST['app/scripts/templates/typeahead.ejs']
						});
					},
					error: function(){
						console.log('Some error where fetching all the products to populate the typeahead');
					}
				});

			},
			render: function(){
				this.$el.append(this.template);
			},
			addToTable : function($e, data){
				var item = new InvoiceItem({
					name    : data.name,
					price	: data.price,
					itemCode: data.productCode
				});
				invoiceItems.add(item,{merge: false});
				$('.invoiceItemsContainer').fadeIn(400);
				$('.table').append(invoiceItemsView.render().$el);
				$('#SerachProduct').val('');

			},
			
			print: function(){
				invoiceItems.each(function(model){
					var product = new Product({ id : model.get('itemCode') });
					product.fetch({
						success : function(){
							product.save(
							{
								qty: (product.get('qty')-model.get('qty'))
							},{
								success:function(){
									console.log('saved');
								},
								error:function(){
									console.log('Some problem in updating Product to DB');
								}
							});
						}
					});
				});
			// window.print();
		},
		removeItems: function(){
			location.reload(true);
		}
	});
return SearchView;
});