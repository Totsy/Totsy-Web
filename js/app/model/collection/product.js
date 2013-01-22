/**
 * app/model/collection/product.js
 */

define(['app', 'app/model/entity/product'], function(Totsy, Product) {
    return Backbone.Collection.extend({
        model: Product
    });
});
