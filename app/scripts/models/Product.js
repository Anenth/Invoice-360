/*global define*/

define([
    'underscore',
    'backbone',
    'config'
], function (_, Backbone, config) {
    'use strict';

    var ProductModel = Backbone.Model.extend({
        defaults: {
            name:'new product',
            qty:0,
            price:0
        },
        urlRoot: function(){
            return config.url + '/product';
        },
    });

    return ProductModel;
});
