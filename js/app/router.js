/**
 * router.js
 *
 * The application router that maps request URLs to application route/actions.
 *
 * @author Tharsan Bhuvanendran <tbhuvanendran@totsy.com>
 * @package app
 * @copyright Totsy Inc, 2012
 */

define(['app/route/catalog'], function(catalog) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            "": "eventList",
            "event": "eventList"
        },
        initialize: function() {
            this.route(/^event\/\d+$/, 'eventView');
            this.route(/^product\/\d+$/, 'productView');
        }
    });

    return {
        init: function() {
            window.router = new AppRouter();
            router.on('route:eventList', catalog.eventList);
            router.on('route:eventView', catalog.eventView);
            router.on('route:productView', catalog.productView);

            Backbone.history.start({pushState: true});
        }
    }
});
