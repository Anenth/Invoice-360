/*global define*/

define([
    'underscore',
    'backbone',
    'config'
    ], function (_, Backbone, config) {
        'use strict';
        var search = function(DataSet, id){
            for(var i in DataSet){
                if(DataSet[i].productCode == id){
                    return i;
                }
            }
        };
        var ProductModel = Backbone.Model.extend({
            defaults: {
                name:'new product',
                qty:0,
                price:0
            },
            urlRoot: function(){
                return config.url + '/product';
            },
            fetch:function(options){
                var _this = this;
                if(navigator.onLine){
                    return Backbone.Model.prototype.fetch.apply(this, arguments) ;
                }else{        
                    var dataSetMaster = JSON.parse(localStorage.getItem('products'));
                    var product = $.grep(dataSetMaster, function(e){return e.productCode == _this.id} );
                    return product;
                }
            },
            save:function(options){
                if(navigator.onLine){
                    return Backbone.Model.prototype.save.apply(this, arguments) ;
                }else{
                    var dataJson = this.fetch()[0];
                    dataJson.qty = options.qty;
                    var dataSetMaster = JSON.parse(localStorage.getItem('products'));
                    var dataSetSlave = JSON.parse(localStorage.getItem('productsUpdated'));
                    var i = search(dataSetMaster, this.id);
                    dataSetMaster.splice(i, 1);
                    dataSetMaster.push(dataJson);
                    localStorage.setItem('products', JSON.stringify(dataSetMaster));
                    if(dataSetSlave){
                        dataSetSlave.push(dataJson);
                        localStorage.setItem('productsUpdated', JSON.stringify(dataSetSlave));
                    }else{
                        localStorage.setItem('productsUpdated', JSON.stringify(Array(dataJson)));
                        }
                }
        }
});

return ProductModel;
});
