/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'collections/Products',
    'typeahead',
    'models/InvoiceItem',
    'collections/InoviceItems',
    'views/InvoiceItem'
], function ( $, _, Backbone, JST, Products, typeahead, InvoiceItem, InvoiceItems, InvoiceItemsView) {
    'use strict';
    var invoiceItems = new InvoiceItems();
    var invoiceItemsView = new InvoiceItemsView({collection : invoiceItems});
    var SearchView = Backbone.View.extend({
		el:'.mainContainer',
        template: JST['app/scripts/templates/Search.ejs'],
        collection: new Products(),
        events:{
			'typeahead:autocompleted':'addToTable',
			'typeahead:selected'	 :'addToTable'
        },
        initialize: function(){
			this.render();
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
			$('.table').append(invoiceItemsView.render().$el);
		
			$('#SerachProduct').val('');

        }
    });

    return SearchView;
});