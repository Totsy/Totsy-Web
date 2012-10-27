/**
 * app/view/event/index.js
 */

define(['app'], function(Totsy) {
    return Totsy.View.extend({
        templateName: 'event-list',
        events: {
            'click #events-live li a': "viewEvent"
        },
        getContext: function() {
            var ctx = this.data;
            if (ctx instanceof Backbone.Collection) {
                ctx = ctx.toJSON();
            }

            return {'events': ctx};
        },
        viewEvent: function(e) {
            alert("View Event");

            e.preventDefault();
            return false;
        }
    });
});
