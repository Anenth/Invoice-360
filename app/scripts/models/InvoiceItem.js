/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var Invoiceitem = Backbone.Model.extend({
        defaults: {
            index:0,
			name:'null',
			price:0,
			qty:1,
            itemCode:0,
            total: 0
        },
        initialize:function(){
            this.set({'total' : this.get('price')});
            this.on('change:qty', this.getTotal);
        },
        getTotal: function(model, qty){
			this.set({'total' : qty * this.get('price') }); 
        }
    });

    return Invoiceitem;
});