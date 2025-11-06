(function () {
    'use strict';

    angular
    .module('YieldEstateApp.Services.EstateRoutes')
    .provider('log', log);

    log.$inject = [];

    function log () {
      
       
        /* Private state/methods */
        var prefix = '[YieldEstateApp]',
        suffix = '.';

    // Service Implementation
    var log = function (level, message) {
        console.log(prefix + '[' + level + '] ' + message + suffix);
    };

    /* Public state/methods */
    // Configuration methods / Public methods
    this.setPrefix = function (newPrefix) {
        prefix = newPrefix;
    };

    this.setSuffix = function (newSuffix) {
        suffix = newSuffix;
    };

    this.$get = function () {
        // Public API
        return {
            error: function (message) {
                log('ERROR', message);
            },
            info: function (message) {
                log('INFO', message);
            },
            debug: function (message) {
                log('DEBUG', message);
            }
        };
    };
    

}
})();




