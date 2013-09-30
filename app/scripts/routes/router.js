/*global define*/

define([
    'jquery',
    'backbone',
    'views/Main',
    'bootstrap'
], function ($, Backbone, MainView) {
    'use strict';

    var Router = Backbone.Router.extend({
        routes: {
			'': 'index',
			'reports':'report'
        },
        index: function(){
        	var mainView = new MainView();
        },
        report: function(){
        }

    });
    var router = new Router();
    Backbone.history.start();
    return router;
});