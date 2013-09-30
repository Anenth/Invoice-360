/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'collections/Products',
    'typeahead',
    'hogan'
], function ( $, _, Backbone, JST, Products, typeahead, Hogan) {
    'use strict';

    var SearchView = Backbone.View.extend({
		el:'.mainContainer',
        template: JST['app/scripts/templates/Search.ejs'],
        collection: new Products(),
        events:{
			'typeahead:autocompleted':'addToTable',
			'typeahead:selected':'addToTable'
        },
        initialize: function(){
			this.render();
			this.collection.fetch({
				success: function(data){
					$('#SerachProduct').typeahead({
						name: 'products',
						valueKey:'name',
						local: data.toJSON(),
						template: JST['app/scripts/templates/typeahead.ejs']
					});
				},
				error: function(){
					console.log("Some error where fetching all the products to populate the typeahead")
				}
			});
        },
		render: function(){
			this.$el.append(this.template);
			
        },
		addToTable : function($e, data){
			$('#SerachProduct').val('');
        }
    });

    return SearchView;
});