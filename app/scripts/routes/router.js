/*global define*/

define([
    'jquery',
    'backbone',
    'views/Main',
    'views/Search',
    'bootstrap'
], function ($, Backbone, MainView, SearchView) {
    'use strict';

    var Router = Backbone.Router.extend({
        routes: {
			'': 'index',
			'reports':'report'
        },
        index: function(){
        	new SearchView();
        },
        report: function(){
        },
		initialize: function(){
			new MainView();
		}
    });
    var router = new Router();
    Backbone.history.start();
    return router;
});