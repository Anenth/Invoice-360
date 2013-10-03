/*global define*/

define([
    'underscore',
    'backbone',
    'models/Invoice'
], function (_, Backbone, InvoiceModel) {
    'use strict';

    var InvoiceCollection = Backbone.Collection.extend({
        model: InvoiceModel,
        url: 'http://127.0.0.1:8889/invoice'
    });

    return InvoiceCollection;
});