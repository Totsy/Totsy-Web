/**
 * app/model/entity/event.js
 */

define(['app', 'app/model/collection/product'], function(Totsy) {
    return Totsy.Model.extend({
        url: Totsy.apiBaseUrl + '/event'
    });
});
