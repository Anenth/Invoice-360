/*global define*/

define([
    'underscore',
    'backbone',
    'config'
], function (_, Backbone, config) {
    'use strict';

    var InvoiceModel = Backbone.Model.extend({
        defaults: {
			amount:'0',
			date:'null'
        },
        urlRoot: function(){
            return config.url + '/invoice';
        },
        save: function(options){
            if(navigator.onLine){
                return Backbone.Model.prototype.save.apply(this, arguments) ;
            }else{
                var invoiceNo = parseInt( localStorage.getItem('invoiceNumber'),10) + 1;
                localStorage.setItem('invoiceNumber', invoiceNo);
                var dataJson = {'amount': options.amount, 'qty': options.qty, items: options.items, 'invoiceNumber': invoiceNo};
                var dataSetSlave = JSON.parse(localStorage.getItem('invoices'));
                if(dataSetSlave){
                    dataSetSlave.push(dataJson);
                    localStorage.setItem('invoices', JSON.stringify(dataSetSlave));
                }else{
                    localStorage.setItem('invoices', JSON.stringify(Array(dataJson)));
                }      
                return invoiceNo;          
            }
        }

    });

    return InvoiceModel;
});