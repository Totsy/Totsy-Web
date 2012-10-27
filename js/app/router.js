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
            this.route(/^sales\/.*\.html$/, 'productList');
        }
    });

    return {
        init: function() {
            window.router = new AppRouter();
            router.on('route:eventList', catalog.eventList);
            router.on('route:productList', catalog.productList);
            router.on('route:productView', catalog.productView);

            Backbone.history.start({pushState: true});
        }
    }
});
