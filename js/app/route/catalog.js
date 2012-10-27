/**
 * app/route/catalog.js
 */

define(
    ['app/model/collection/event', 'app/view/event/index'],
    function(EventCollection, EventCollectionView) {
        return {
            eventList: function() {
                var view = new EventCollectionView(),
                    coll = new EventCollection();

                coll.when = 'current';
                coll.fetch({
                    success: function(collection) {
                        view.data = collection;
                        view.render();
                    }
                });
            },
            productList: function() {
                console.log('product list');
            },
            productView: function() {
                console.log('product view');
            }
        }
    }
);
