/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/ProductView'
], function ($, _, Backbone, JST, ProductView) {
    'use strict';

    var MainView = Backbone.View.extend({
        template: JST['app/scripts/templates/Main.ejs'],
        initialize:function(){
			var productView = new ProductView();
			productView.on('Message', this.alertService);

        },
        alertService: function(msg){
			alert(msg);
			// $('#myElement').addClass(myparameter);
        }

    });
    return MainView;
});