/**
 * app.js
 * @author Tharsan Bhuvanendran <tbhuvanendran@totsy.com>
 *
 * The Totsy core application. This creates an object for internal application
 * functions, and then initializes the application.
 * This process includes configuring AJAX requests, setting up the router and
 * navigation processes.
 */

var Totsy = {};


/**
 * Totsy.App
 * core application object
 */

Totsy.App = {
    baseUrl: 'http://api-staging.totsy.com',
    router: null,
    templates: {},

    init: function() {
        $.ajaxSetup({
            headers: {
                Authorization: 'Basic dGhhcnNhbjp0aGFyc2FuMTIz'
            }
        });

        var AppRouter = Backbone.Router.extend({
            routes: {
                "": "eventList",
                "event": "eventList"
            },
            initialize: function() {
                this.route(/^sales\/.*\.html$/, "productList");
            },
            eventList: Totsy.App.Catalog.eventList,
            productList: Totsy.App.Catalog.productList
        });

        Totsy.App.router = new AppRouter;
        Backbone.history.start({pushState: true});
    },

    renderView: function(templateName, context) {
        // load, compile, and save the template if it hasn't been cached already
        if (!(templateName in Totsy.App.templates)) {
            $.ajax({
                url: '/view/' + templateName + '.hbs',
                async: false,
                success: function(data) {
                    Totsy.App.templates[templateName] = Handlebars.compile(data);
                }
            });
        }

        return Totsy.App.templates[templateName](context);
    }
};


/**
 * Totsy.Model
 * base application model, subclass of the Backbone model.
 */

Totsy.Model = Backbone.Model.extend({
    resourceUrl: function(rel) {
        var links = this.get('links');
        for (i = 0; i < links.length; i++) {
            if (rel == links[i].rel) {
                return links[i].href;
            }
        }
    }
});


/**
 * Handlebars template helpers
 */

Handlebars.registerHelper('resourcelink', function(options) {
    for (i = 0; i < this.links.length; i++) {
        if (options.hash.rel == this.links[i].rel) {
            return this.links[i].href;
        }
    }
});

Handlebars.registerHelper('iter', function(context, options) {
    var fn = options.fn, inverse = options.inverse;
    var ret = "";

    if(context && context.length > 0) {
        for(var i=0, j=context.length; i<j; i++) {
            ret = ret + fn(_.extend({}, context[i], { idx: i }));
        }
    } else {
        ret = inverse(this);
    }

    return ret;
});

Handlebars.registerHelper('priceformat', function(price) {
    return parseInt(price).toFixed(2);
});

/**
 * Initialize and run application
 */

$(Totsy.App.init);
