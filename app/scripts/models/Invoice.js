/*global define*/

define([
    'underscore',
    'backbone',
    'config'
], function (_, Backbone, config) {
    'use strict';

    var InvoiceModel = Backbone.Model.extend({
        defaults: {
			amount:'0',
			date:'null'
        },
        urlRoot: function(){
            return config.url + '/invoice';
        },

    });

    return InvoiceModel;
});