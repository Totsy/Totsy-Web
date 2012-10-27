/**
 * app/model/entity/event.js
 */

define(['app'], function(Totsy) {
    return Totsy.Model.extend({
        url: Totsy.apiBaseUrl + '/event'
    });
});
