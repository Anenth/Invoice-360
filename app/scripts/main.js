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
        }
    },
    paths: {
        jquery      : '../bower_components/jquery/jquery',
        backbone    : '../bower_components/backbone/backbone',
        underscore  : '../bower_components/underscore/underscore',
        typeahead   : '../bower_components/typeahead.js/dist/typeahead',
        hogan       : '../bower_components/hogan/web/1.0.0/hogan',
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