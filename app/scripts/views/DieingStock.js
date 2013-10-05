/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/DieingStockItemsContainer'
    ], function ($, _, Backbone, JST, Container) {
        'use strict';

        var DieingstockView = Backbone.View.extend({
            el:'.mainContainer',
            template: JST['app/scripts/templates/DieingStock.ejs'],
            render:function(){
                this.$el.append(this.template);
                var container = new Container();
                $('.dieingStock .table').append(container.render().$el);
            }
        });
        return DieingstockView;
    });