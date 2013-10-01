/*global define*/

define([
	'jquery',
	'underscore',
	'backbone',
	'collections/InoviceItems',
	'views/RowItem'
	], function ($, _, Backbone, Items, RowView) {
		'use strict';

		var InvoiceitemView = Backbone.View.extend({
			collection : Items,
			tagName:'tbody',
			events:{
				'click .print':'print'
			},
			initialize:function(){
				_.bindAll(this, 'render', 'renderOne');
				// this.collection.on('change', this.render, this);
			},
			render:function(){
				this.$el.html('');
				this.collection.each(this.renderOne);
				return this;
			// $('.invoiceItemsContainer').html(this.template({ items: this.collection.toJSON() }));
			},
			renderOne:function(model,index){
				var row = new RowView({model:model, index:index });
				this.$el.append(row.render().$el);
				return this;
			},
			print: function(e,model){
				console.log(e.target.value);
				console.log(model);
			}
		});
		return InvoiceitemView;

	});