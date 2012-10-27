/**
 * main.js
 *
 * The application bootstrap that initializes the application & router objects.
 *
 * @author Tharsan Bhuvanendran <tbhuvanendran@totsy.com>
 * @package js
 * @copyright Totsy Inc, 2012
 */

require(['app', 'app/router'], function(Totsy, Router) {
    Totsy.init();
    Router.init();
});
