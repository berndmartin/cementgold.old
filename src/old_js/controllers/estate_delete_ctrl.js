"use strict";

angular.module('YieldEstateApp.Ctrl.EstateDelete',[])
.controller('EstateDeleteCtrl',function ($scope, $route, $routeParams, $location, EstateDataService) {
    var id = $routeParams.id;

    $scope.estate = EstateDataService.getEstateById(id);

    $scope.deleteEstate = function(id) {
        EstateDataService.deleteEstateById(id);
        $location.path('/estates');
    };

    $scope.cancel = function() {
        window.history.back();
    };

});
