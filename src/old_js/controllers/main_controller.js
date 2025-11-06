(function () {
    'use strict';

    angular
       .module('YieldEstateApp.controllers.Main')
       .controller('MainController', MainController);

    MainController.$inject = ['config','$rootScope','$scope','$location','$anchorScroll','EstateSetup','EstateAphorims','EstateDataService','log','EstateTranslateService'];

    function MainController(config,$rootScope,$scope,$location,$anchorScroll,EstateSetup,EstateAphorims,EstateDataService,log,EstateTranslateService) {
     log.debug("my service start zu load:"+config.appName+" Version:"+config.appVersion);
      $scope.aphorims       = EstateAphorims.getAphrims();       // app
      $scope.estates        = EstateDataService.getEstates();
      $scope.items          = EstateTranslateService.getHelp(); 
      $scope.setup          = EstateSetup.getSetup();  
      $scope.name           = "";
      $scope.transid        = "";
      $scope.config         = config;
      $scope.mydate         = new Date();
      

      $scope.onItemSelected = function(selectedTransId){
        updateHelp(selectedTransId);
      };

      $scope.updateHelp = function(selectedTransId){
        $rootScope.masterh  = selectedTransId;
      };
      
      $scope.scrollToPos = function(panel) {
        $location.hash(panel);
        $anchorScroll();
      };
      

      // watch cnt of service
      $scope.$watch(function () { return EstateDataService.cntEstates() }, function (newVal, oldVal) {
        log.debug("after cntEstates() "+newVal+" "+oldVal);
        if (newVal != oldVal ) {
          $scope.estates  = EstateDataService.getEstates();
        }
      });

    }
})();


