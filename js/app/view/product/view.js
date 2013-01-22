/**
 * app/view/product/view.js
 */

define(['app', 'app/model/entity/event'], function(Totsy, Event) {
    return Totsy.View.extend({
        templateName: 'product/view',
        events: {
        },
        getEvent: function() {
            var eventUrl = this.data.getResourceUrl('http://rel.totsy.com/entity/event'),
                event    = new Event();

            event.url = Totsy.apiBaseUrl + eventUrl;
            event.fetch({ async: false });

            return event;
        },
        getContext: function() {
            var ctx = {};

            if (this.data instanceof Backbone.Model) {
                ctx.product = this.data.toJSON();
            } else {
                ctx.product = this.data;
            }

            ctx['event'] = this.getEvent().toJSON();

            return ctx;
        }
    });
});
