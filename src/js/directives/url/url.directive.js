(function () {
    'use strict';

    angular
       .module('YieldEstateApp.Directive.EstateUrl')
       .directive('estateUrl', estateUrl);

    estateUrl.$inject = ['log','$sce','$rootScope'];

    function estateUrl (log,$sce,$rootScope) {
      
        log.debug("estateUrl:start ");
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var externalRe = new RegExp("^(http|https)://");
                var url = scope.estate.url;
                log.debug("estateUrl: "+url);
                
                if(externalRe.test(url)) {
                    $rootScope.goToLink(url);
                } else { 
                    "This is not a valid URl: "+url;
                }
            }
        };

    }
})();

