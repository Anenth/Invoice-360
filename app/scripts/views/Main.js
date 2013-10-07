/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/ProductView',
    'models/Offline'
    ], function ($, _, Backbone, JST, ProductView, Offline) {
        'use strict';

        var MainView = Backbone.View.extend({
            template: JST['app/scripts/templates/Main.ejs'],
            initialize:function(){
                var productView = new ProductView();
                productView.on('Message', this.alertService);

                if(navigator.onLine){
                    var offline = new Offline(),
                    products = localStorage.getItem('productsUpdated') || null,
                    invoices = localStorage.getItem('invoices') || null;
                    localStorage.removeItem('productsUpdated');
                    localStorage.removeItem('invoices');
                    if(products || invoices){
                        offline.save({
                            'products':products,
                            'invoice' :invoices
                        },{
                            success:function(model){
                                console.log('Synced');
                            },
                            error:function(){
                                console.log('cannot be syned');
                            }
                        });
                    }
                }

            },
            alertService: function(msg){
                alert(msg);
            }

        });
    return MainView;
    });