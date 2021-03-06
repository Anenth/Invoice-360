/*global define*/

define([
    'underscore',
    'backbone',
    'models/InvoiceItem'
    ], function (_, Backbone, InoviceitemModel) {
        'use strict';

        var InoviceitemsCollection = Backbone.Collection.extend({
            model: InoviceitemModel,
            initialize:function(){
                this.grandTotal = 0;
                this.qtyTotal =0;
                this.on('change add',this.calculate);
                this.on('destroy',this.subtract);
            },
            renderTotal:function(){
                $('#qtyTotal').text(this.qtyTotal);
                $('#grandTotal').text(this.grandTotal);
            },
            calculate: function(model,event){
                if(!(event.length > 0)){
                    this.grandTotal -= parseInt(model.previous('total'),10);
                    this.qtyTotal   -= parseInt(model.previous('qty'),10);
                }
                this.grandTotal += parseInt(model.get('total'),10);
                this.qtyTotal   += parseInt(model.get('qty'),10);
                this.renderTotal();
            },
            subtract:function(model){
                this.grandTotal -= parseInt(model.get('total'),10);
                this.qtyTotal   -= parseInt(model.get('qty'),10);
                this.renderTotal();
            },
        });

return InoviceitemsCollection;
});