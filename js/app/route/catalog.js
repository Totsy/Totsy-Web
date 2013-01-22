/**
 * app/route/catalog.js
 */

define(
    [
        'app',
        'app/model/entity/event',
        'app/model/entity/product',
        'app/model/collection/event',
        'app/model/collection/product',
        'app/view/event/view',
        'app/view/product/view',
        'app/view/event/index',
        'app/view/product/index'
    ],
    function(
        Totsy,
        Event,
        Product,
        EventCollection,
        ProductCollection,
        EventView,
        ProductView,
        EventCollectionView,
        ProductCollectionView
    ) {
        return {
            eventList: function() {
                var view = new EventCollectionView(),
                    coll = new EventCollection(),
                    uri  = location.pathname;

                if ('/' == uri) {
                    uri = '/event?when=current';
                }

                coll.url = Totsy.apiBaseUrl + '/event?when=current';
                coll.fetch({ async: false });

                view.data = coll;
                view.render();
            },
            eventView: function() {
                var entity = new Event(),
                    view   = new EventView();

                entity.url = Totsy.apiBaseUrl + location.pathname;
                entity.fetch({ async: false });

                view.data = entity;
                view.render();

                var coll = new ProductCollection(),
                    view = new ProductCollectionView();

                coll.url = entity.getResourceUrl('http://rel.totsy.com/collection/product');
                coll.fetch({ async: false });

                view.data = coll;
                view.el = $('#event-products').get(0);
                view.render();
            },
            productView: function() {
                var view = new ProductView(),
                    entity = new Product();

                entity.url = Totsy.apiBaseUrl + location.pathname;
                entity.fetch({ async: false });

                view.data = entity;
                view.render();
            }
        }
    }
);
