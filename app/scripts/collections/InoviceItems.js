/*global define*/

define([
    'underscore',
    'backbone',
    'models/InvoiceItem'
], function (_, Backbone, InoviceitemModel) {
    'use strict';

    var InoviceitemsCollection = Backbone.Collection.extend({
        model: InoviceitemModel
    });

    return InoviceitemsCollection;
});