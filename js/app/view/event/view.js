/**
 * app/view/event/view.js
 */

define(['app'], function(Totsy) {
    return Totsy.View.extend({
        templateName: 'event/view',
        events: {
            'click #events-live li a': "navigateUrl"
        },
        getContext: function() {
            if (this.data instanceof Backbone.Model) {
                return this.data.toJSON();
            }

            return this.data;
        },
        getPageTitle: function() {
            return 'Totsy / ' + this.data.name;
        }
    });
});
