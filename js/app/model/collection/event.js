/**
 * app/model/collection/event.js
 */

define(['app', 'app/model/entity/event'], function(Totsy, Event) {
    return Backbone.Collection.extend({
        model: Event,
        when: 'current',
        url: function() {
            return Totsy.apiBaseUrl + '/event?when=' + this.when
        }
    });
});
