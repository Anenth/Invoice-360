/*global define*/

define([
    'jquery',
    'backbone',
    'views/Main',
    'views/Search',
    'views/Report',
    'views/DieingStock',
    'bootstrap'
], function ($, Backbone, MainView, SearchView, ReportView, DieingStock) {
    'use strict';
    var navClass = function(id){
        $('.active').removeClass('active');
        $('#'+id).addClass('active');
    };
    var searchView = new SearchView(),
    reportView     = new ReportView(),
    dieingStock    = new DieingStock();

    var Router = Backbone.Router.extend({
        routes: {
			''           : 'index',
			'reports'    : 'report',
            'dieingStock': 'dieingStock'
        },
        index: function(){
            navClass('nav-invoice');
            searchView.render();
        },
        report: function(){
            navClass('nav-report');
            reportView.render();
            $('.invoiceItemsContainer').hide();
        },
        dieingStock:function(){
            navClass('nav-products');
            dieingStock.render();
            $('.invoiceItemsContainer').hide();
        },
		initialize: function(){
			new MainView();
		}

    });

    var router = new Router();
    Backbone.history.start();
    return router;
});