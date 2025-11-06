(function () {
    'use strict';

    angular
       .module('YieldEstateApp.controllers.Main')
       .controller('MainController', MainController);

    MainController.$inject = ['config','$rootScope','$scope','$location','$anchorScroll','EstateSetup','EstateAphorims','EstateDataService','EstateTranslateService'];

    function MainController (config,$rootScope,$scope,$location,$anchorScroll,EstateSetup,EstateAphorims,EstateDataService,EstateTranslateService) {
      var mc = this;
      
      mc.aphorims       = EstateAphorims.getAphrims();       // app
      mc.estates        = EstateDataService.getEstates();
      mc.items          = EstateTranslateService.getHelp(); 
      mc.setup          = EstateSetup.getSetup();  
      mc.name           = "";
      mc.transid        = "";
      mc.config         = config;
      mc.mydate         = new Date();
      
      mc.onItemSelected = onItemSelected;
      mc.updateHelp = updateHelp;
      mc.scrollToPos = scrollToPos;

      /////////

      function onItemSelected (selectedTransId){
        updateHelp(selectedTransId);
      }

      function updateHelp (selectedTransId){
        $rootScope.masterh  = selectedTransId;
      }
      
      function scrollToPos (panel) {
        $location.hash(panel);
        $anchorScroll();
      }
      
     $scope.$watch(function () { return EstateDataService.cntEstates() }, function (newVal, oldVal) {
        if (newVal != oldVal ) {
          mc.estates  = EstateDataService.getEstates();
        }
      });

    }
})();