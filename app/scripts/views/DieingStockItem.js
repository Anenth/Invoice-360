/*global define*/

define([
	'jquery',
	'underscore',
	'backbone',
	'templates',
	'models/DieingStock',
	'models/Product'
	], function ($, _, Backbone, JST, DieProduct, Product) {
		'use strict';

		var DieingstockitemView = Backbone.View.extend({
			template: JST['app/scripts/templates/DieingStockItem.ejs'],
			model : DieProduct,
			tagName:'tr',
			events:{
				'click .glyphicon-trash' : 'delete',
				'click .addQty' : 'addQty'
			},
			initialize: function(){
				this.model.on('change destory',this.render,this);
			},
			render:function(){
				this.$el.html(this.template(this.model.toJSON()));
				return this;
			},
			delete:function(){
				var _this = this;
				if(confirm('Really delete item ' + this.model.get('name') + '? This actions cannot be undone')){
					var product = new Product({ id : this.model.get('productCode') });
					product.fetch({
						success:function(){
							product.destroy({
								success:function(){ _this.$el.fadeOut(400);	},
								error:function(){
									console.log('Some problem in updating Product to DB');
								}
							});
						}
					});
				}
				return false;
			},
			addQty:function(){
				var productCode = this.model.get('productCode');
				var _this = this;
				var qtyTobeAdded =  $('.'+productCode+ '.input-qty').val();
				if(confirm('Add ' + qtyTobeAdded + 'of '+ this.model.get('name') +' to your store ?')){
					var product = new Product({ id : productCode });
					product.fetch({
						success:function(){
							var totalQty = (product.get('qty') + parseInt(qtyTobeAdded,10));
							product.save({
								qty:totalQty
							},{
								success:function(){
									_this.model.set('qty',totalQty);
								},
								error:function(){
									console.log('Some problem in updating Product to DB');
								}
							});
						}
					});
				}
				return false;
			}

		});
		return DieingstockitemView;
	});