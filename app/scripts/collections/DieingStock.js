/*global define*/

define([
    'underscore',
    'backbone',
    'models/DieingStock',
    'config'
], function (_, Backbone, DieingStock, config) {
    'use strict';

    var DieingstockCollection = Backbone.Collection.extend({
        model: DieingStock,
        url : function(){
            return config.url + '/dieStock';
        }
    });

    return DieingstockCollection;
});