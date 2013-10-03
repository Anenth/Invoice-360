/*global define*/

define([
    'jquery',
    'backbone',
    'views/Main',
    'views/Search',
    'views/Report',
    'bootstrap'
], function ($, Backbone, MainView, SearchView, ReportView) {
    'use strict';
    var navClass = function(id){
        $('.active').removeClass('active');
        $('#'+id).addClass('active');
    }
    var Router = Backbone.Router.extend({
        routes: {
			'': 'index',
			'reports':'report'
        },
        index: function(){
            navClass("nav-invoice");
        	var searchView = new SearchView();
            searchView.render();
        },
        report: function(){
            navClass("nav-report");
            var reportView = new ReportView();
            reportView.render();
        },
		initialize: function(){
			new MainView();
		}

    });

    var router = new Router();
    Backbone.history.start();
    return router;
});