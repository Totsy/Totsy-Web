/**
 * app/view/event/index.js
 */

define(['app'], function(Totsy) {
    return Totsy.View.extend({
        templateName: 'event/index',
        pageTitle: "Totsy ... for Moms",
        events: {
            'click ul.events > li > a': "navigateUrl"
        },
        getContext: function() {
            var ctx = this.data;
            if (ctx instanceof Backbone.Collection) {
                ctx = ctx.toJSON();
            }

            return {'events': ctx};
        }
    });
});
