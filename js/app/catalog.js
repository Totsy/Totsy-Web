/**
 * app.js
 * @author Tharsan Bhuvanendran <tbhuvanendran@totsy.com>
 *
 * The Totsy Catalog application. This creates an object for catalog functionality,
 * which is browsing events and products.
 */

/**
 * Models
 */

var Event = Totsy.Model.extend({
    url: Totsy.App.baseUrl + '/event'
});

var Product = Totsy.Model.extend({
    url: Totsy.App.baseUrl + '/product'
});


/**
 * Collections
 */

var EventCollection = Backbone.Collection.extend({
    model: Event,
    when: 'current',
    slug: '',
    url: function() {
        return Totsy.App.baseUrl + '/event?when=' + this.when;
    }
});

var ProductCollection = Backbone.Collection.extend({
    model: Product
});


/**
 * Views
 */

var EventCollectionView = Backbone.View.extend({
    events: {
        'click #events-live li a': "viewEvent"
    },
    el: document.getElementById('mainContent'),
    data: {},
    render: function() {
        var view = this,
            events = new EventCollection();

        events.when = 'current';
        events.fetch({
            success: function(collection) {
                view.data.events = collection;
                view.el.innerHTML = Totsy.App.renderView(
                    'event-list',
                    {'events': collection.toJSON()}
                );
            }
        });
    },
    viewEvent: function(e) {
        var idx      = e.currentTarget.getAttribute('data-index'),
            event    = this.data.events.at(idx),
            eventUrl = event.resourceUrl('alternate');

        eventUrl = eventUrl.substring(eventUrl.indexOf('/', 7));
        Totsy.App.Catalog.rewrites[eventUrl] = event;
        Totsy.App.router.navigate(eventUrl, {trigger: true});

        e.preventDefault();
        return false;
    }
});

var ProductCollectionView = Backbone.View.extend({
    events: {
        'click .event-products li a': "viewProduct"
    },
    el: document.getElementById('mainContent'),
    data: {},
    render: function() {
        var view = this,
            products = new ProductCollection();

        products.url = this.data.event.resourceUrl('http://rel.totsy.com/collection/product');
        products.fetch({
            success: function(collection) {
                view.data.products = collection;
                view.el.innerHTML = Totsy.App.renderView(
                    'event',
                    {'event': view.data.event.toJSON(), 'products': collection.toJSON()}
                );
            }
        });
    },
    viewProduct: function(e) {
        alert("viewing product");

        e.preventDefault();
        return false;
    }
});

/**
 * Application
 */

Totsy.App.Catalog = {
    rewrites: {},
    init: function() {
    },
    eventList: function() {
        var view = new EventCollectionView();
        view.render();
    },
    productList: function() {
        var currentUrl = location.href.substring(location.href.indexOf('/', 7)),
            view       = new ProductCollectionView();

        if (currentUrl in Totsy.App.Catalog.rewrites) {
            console.log("going to just load product list for event");
            view.data.event = Totsy.App.Catalog.rewrites[currentUrl];
            view.render();
        } else {
            console.log("going to find the event for current URL " + location.href);
            var events = new EventCollection();
            events.slug = location.href.substring(location.href.indexOf('/', 7));
            events.fetch({
                success: function(collection) {
                    view.data.event = collection.at(0);
                    view.render();
                }
            });
        }
    }
};

$(Totsy.App.Catalog.init);
