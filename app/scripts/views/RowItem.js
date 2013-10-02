/*global define*/

define([
	'jquery',
	'underscore',
	'backbone',
	'templates',
	'models/InvoiceItem'
	], function ($, _, Backbone, JST, Item) {
		'use strict';

		var RowitemView = Backbone.View.extend({
			template: JST['app/scripts/templates/RowItem.ejs'],
			model: Item,
			tagName:'tr',
			events:{
				'change .input-qty':'calculateTotal',
				'click .glyphicon-trash' : 'delete'
			},
			initialize: function(){
				this.model.set({'index':this.options.index});
				this.model.on('change destroy',this.render,this);
			},
			render:function(){
				this.$el.html(this.template(this.model.toJSON()));
				return this;
			},
			calculateTotal: function(e){
				this.model.set({'qty': e.target.value });
			},
			delete:function(){
				if(confirm('Really delete item ' + this.model.get('name') + '?')){
					this.model.destroy();
					this.$el.fadeOut(400);
				}
				return false
			}

		});

		return RowitemView;
	});