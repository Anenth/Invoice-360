/*global define*/

define([
    'underscore',
    'backbone',
    'models/Product'
], function (_, Backbone, ProductModel) {
    'use strict';

    var ProductsCollection = Backbone.Collection.extend({
        model: ProductModel,
        url: 'http://127.0.0.1:8889/product'
    });

    return ProductsCollection;
});