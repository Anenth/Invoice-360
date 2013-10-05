/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        typeahead:{
            deps:['jquery'],
            exports: 'jQuery.fn.typeahead'
        }
    },
    paths: {
        config      :'config',
        jquery      : '../bower_components/jquery/jquery',
        backbone    : '../bower_components/backbone/backbone',
        underscore  : '../bower_components/underscore/underscore',
        typeahead   : '../bower_components/typeahead.js/dist/typeahead',
        bootstrap   : 'vendor/bootstrap'
    }
});

/*require([
    'backbone','bootstrap'
], function (Backbone) {
    Backbone.history.start();
});*/
require(['routes/router'], function (Router) {

});