/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var ProductModel = Backbone.Model.extend({
        defaults: {
			name:'new product',
			qty:0,
			price:0
        },
        urlRoot: 'http://127.0.0.1:8889/product',
    });

    return ProductModel;
});
/*url : function() {
          var base ='http://127.0.0.1:8889/product'
          if (this.isNew()) return base;
          return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.productCode;
        },*/