/*global define*/

define([
	'jquery',
	'underscore',
	'backbone',
	'collections/DieingStock',
	'views/DieingStockItem',
	], function ($, _, Backbone, Products, RowView) {
		'use strict';

		var DieingstockitemscontainerView = Backbone.View.extend({
			collection : new Products(),
			tagName:'tbody',
			initialize:function(){
				_.bindAll(this, 'render', 'renderOne');
			},
			render:function(){
				this.$el.html('');
				var _this = this;
				this.collection.fetch({
					success:function(){
						_this.collection.each(_this.renderOne);
					}
				});
				return this;
			},
			renderOne:function(model){
				var row = new RowView({model:model});
				this.$el.append(row.render().$el);
				return this;
			}
		});

		return DieingstockitemscontainerView;
	});