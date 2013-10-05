/*global define*/

define([
	'jquery',
	'underscore',
	'backbone',
	'templates',
	'models/Product',
	'collections/Products',
	'models/InvoiceItem',
	'collections/InoviceItems',
	'views/InvoiceItem',
	'models/Invoice',
	'typeahead',
	'views/DieingStock'
], function ( $, _, Backbone, JST, Product, Products, InvoiceItem, InvoiceItems, InvoiceItemsView, Invoice, DieingStock) {
		'use strict';
		var invoiceItems = new InvoiceItems();
		var invoiceItemsView = new InvoiceItemsView({collection : invoiceItems});
		var today,dd,mm,yyyy;
		var searchBox, invoiceContainer;
		var initTypeahead = function(data){
			searchBox = $('#SerachProduct');
			searchBox.typeahead({
				name    : 'products',
				valueKey: 'name',
				local   : data,
				template: JST['app/scripts/templates/typeahead.ejs']
			}).focus();
			$('.loaderPic').hide();
		};
		var disableSeachBox = function(){
			invoiceContainer.hide();
			searchBox.typeahead('destroy');
			searchBox.attr('disabled',true);
		};
		var SearchView = Backbone.View.extend({
			el:'.mainContainer',
			template: JST['app/scripts/templates/Search.ejs'],
			collection: new Products(),
			events:{
				'keypress #SerachProduct' :'command',
				'typeahead:autocompleted':'addToTable',
				'typeahead:selected'	 :'addToTable',
				'click .btn-print'		 :'print',
				'click .btn-cancel'		 :'removeItems'
			},
			initialize: function(){

			},
			command:function(){
				switch(searchBox.val()){
				case 'add product':
					$('#addProduct').modal('show')
					.on('shown.bs.modal', function () {
						$('#inputName').focus();
					});
					break;
				case 'dieing product':
					disableSeachBox();
					window.location = '#dieingStock';
					break;
				case 'report':
					disableSeachBox();
					window.location = '#reports';
					break;
				}
			},

			render: function(){
				var _this = this;
				this.$el.html(this.template);
				$('.loaderPic').show();
				$("#searchboxInfo").popover({
					html:true,
					content: "This is not just a search box. This Search box can read command.Try out the following commands <br> 1.add products <br> 2.reports <br>3.dieing products"
				});
				invoiceContainer = $('.invoiceItemsContainer');
				invoiceContainer.hide();
				if(navigator.onLine){
					this.collection.fetch({
						success: function(data){
							initTypeahead(data.toJSON());
						},
						error: function(){
							console.log('Some error where fetching all the products to populate the typeahead. Retrying ..');
							_this.render();
						}
					});
				}else{
					initTypeahead(this.collection.fetch());
				}
			},
			addToTable : function($e, data){
				var item = new InvoiceItem({
					name    : data.name,
					price	: data.price,
					itemCode: data.productCode
				});
				invoiceItems.add(item);
				$('.invoiceItemsContainer').fadeIn(400);
				$('.invoiceItemsContainer .table').append(invoiceItemsView.render().$el);
				searchBox.val('');
				$('.tt-hint').val('');

			},
			/**
			 * [print - 
			 * 1.get the product model from the ivoices items 
			 * 2.update the product model (reduce the qty)
			 * 3.create a new model inovice and save it to server B-)	* ]**/
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
			},
			removeItems: function(){
				location.reload();
			},
			
		});
return SearchView;
});