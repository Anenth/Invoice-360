/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var InvoiceModel = Backbone.Model.extend({
        defaults: {
			amount:'0',
			date:'null'
        },
        urlRoot: 'http://127.0.0.1:8889/invoice'
    });

    return InvoiceModel;
});