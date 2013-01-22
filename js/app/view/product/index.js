/**
 * app/view/product/index.js
 */

define(['app'], function(Totsy) {
    return Totsy.View.extend({
        templateName: 'product/index',
        events: {
            'click ul.products > li > a': "navigateUrl"
        },
        getContext: function() {
            var ctx = this.data;
            if (ctx instanceof Backbone.Collection) {
                ctx = ctx.toJSON();
            }

            return {'products': ctx};
        }
    });
});
