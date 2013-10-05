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
			initialize:function(){
				_.bindAll(this, 'render', 'renderOne');
			},
			render:function(){
				this.$el.html('');
				this.collection.each(this.renderOne);
				return this;
			},
			renderOne:function(model,index){
				var row = new RowView({model:model, index:index });
				this.$el.append(row.render().$el);
				return this;
			},
		});
		return InvoiceitemView;

	});