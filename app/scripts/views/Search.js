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
	'views/InvoiceItem',
	'models/Invoice',
	], function ( $, _, Backbone, JST, Product, Products, typeahead, InvoiceItem, InvoiceItems, InvoiceItemsView, Invoice) {
		'use strict';
		var invoiceItems = new InvoiceItems();
		var invoiceItemsView = new InvoiceItemsView({collection : invoiceItems});
		var today,dd,mm,yyyy;
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
			},
			render: function(){
				var _this = this;
				this.$el.html(this.template);
				$('.invoiceItemsContainer').hide();
				this.collection.fetch({
					success: function(data){
						$('#SerachProduct').typeahead({
							name    : 'products',
							valueKey: 'name',
							local   : data.toJSON(),
							template: JST['app/scripts/templates/typeahead.ejs']
						});
						$('#SerachProduct').focus();
					},
					error: function(){
						console.log('Some error where fetching all the products to populate the typeahead. Retrying ..');
						_this.render();
					}
				});
			},
			addToTable : function($e, data){
				var item = new InvoiceItem({
					name    : data.name,
					price	: data.price,
					itemCode: data.productCode
				});
				invoiceItems.add(item);
				$('.invoiceItemsContainer').fadeIn(400);
				$('.table').append(invoiceItemsView.render().$el);
				$('#SerachProduct').val('');
				$('.tt-hint').val('');

			},
			/**
			 * [print - 
			 * 1.get the product model from the ivoices items 
			 * 2.update the product model (reduce the qty)
			 * 3.create a new model inovice and save it to server B-)
			 * ]
			 */
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
								},
								error:function(){
									console.log('Some problem in updating Product to DB');
								}
							});
						}
					});
				});
				var invoice = new Invoice();
				invoice.save({
					amount: $('#grandTotal').text(),
					qty: $('#qtyTotal').text(),
					items: invoiceItems,
				},{
					success: function(model){
						$('#invoiceNo').text(model.get('invoiceNumber'));
					},
					error:function(){
						console.log('Some problem in saving Product to DB');
					}
				});
				today = new Date();
				dd = today.getDate();
				mm = today.getMonth()+1;
				yyyy = today.getFullYear();
				if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} today = dd+'/'+mm+'/'+yyyy;
				$('#date').text(today);
				window.print();
				// this.render();
			},
			removeItems: function(){
				this.render();
			}
		});
		return SearchView;
	});