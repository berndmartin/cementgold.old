"use strict";

angular.module('YieldEstateApp.Directive.EstateMap',[])
.directive('estateMap', function (log,$rootScope) {

    log.debug("estateMap:start ");
    // Service impmementation
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var plz = scope.estate.plz;
            var add = scope.estate.address;
            log.debug("estateMap: "+plz+" "+add);
            
            if(plz != null || add != null) {
                $rootScope.goToMap(plz,add);
            } else { 
                "This is not a valid map information: "+plz+" "+add;
            }
        }
    };
});

 