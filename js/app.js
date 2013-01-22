/**
 * app.js
 *
 * The core application object.
 *
 * @author Tharsan Bhuvanendran <tbhuvanendran@totsy.com>
 * @package app
 * @copyright Totsy Inc, 2012
 */

define(function() {
    var templates = {},
        getTemplate = function(templateName) {
            if (!(templateName in templates)) {
                $.ajax({
                    url: '/view/' + templateName + '.hbs',
                    async: false,
                    success: function(data) {
                        templates[templateName] = Handlebars.compile(data);
                    }
                });
            }

            return templates[templateName];
        };

    /**
     * Setup Handlebars helpers.
     */

    Handlebars.registerHelper('resourcelink', function(options) {
        for (i = 0; i < this.links.length; i++) {
            if (options.hash.rel == this.links[i].rel) {
                var href = this.links[i].href;
                if ('extract' in options.hash && 'uri' == options.hash.extract) {
                    return href.substring(href.indexOf('/', 7));
                }
                return href;
            }
        }
    });

    Handlebars.registerHelper('priceformat', function(price) {
        return parseInt(price).toFixed(2);
    });

    return {
        /**
         * The API base URL.
         *
         * @var string
         */
        apiBaseUrl: 'http://api-staging.totsy.com',

        /**
         * The application's base model, that defines common functions/properties
         * required in all application models.
         *
         * @var Backbone.Model
         */
        Model: Backbone.Model.extend({
            getResourceUrl: function(rel) {
                var links = this.get('links');
                for (i = 0; i < links.length; i++) {
                    if (rel == links[i].rel) {
                        return links[i].href;
                    }
                }
            }
        }),

        /**
         * The application's base view, that defines common functions/properties
         * required in all application views.
         *
         * @var Backbone.View
         */
        View: Backbone.View.extend({
            templateName: '',
            data: null,
            el: document.getElementById('content'),
            preRender: function() {},
            render: function() {
                if (this.data && this.templateName) {
                    var tmpl = getTemplate(this.templateName);
                    this.preRender();
                    this.el.innerHTML = tmpl(this.getContext());
                }
            },
            getContext: function() {
                return {};
            },
            getPageTitle: function() {
                if (this.pageTitle) {
                    return this.pageTitle;
                }

                return '';
            },
            navigateUrl: function(e) {
                e.preventDefault();

                window.router.navigate(e.currentTarget.getAttribute('href'), { trigger: true });
            }
        }),

        /**
         * Intialize the application.
         */
        init: function() {
            $.ajaxSetup({
                headers: {
                    Authorization: 'Basic dGhhcnNhbjpiaHV2YW5lbmRyYW44'
                }
            });
        }
    }
});
