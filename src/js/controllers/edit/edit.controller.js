(function () {
    'use strict';

    angular
       .module('YieldEstateApp.Ctrl.EstateEdit')
       .controller('EstateEditCtrl', EstateEditCtrl);

    EstateEditCtrl.$inject = ['$filter','$rootScope','$scope','$routeParams','$location','EstateDataService','log','$anchorScroll','EstateTranslateService','EstateSetup','$interval'];

    function EstateEditCtrl ($filter,$rootScope,$scope,$routeParams,$location,EstateDataService,log,$anchorScroll,EstateTranslateService,EstateSetup,$interval) {
      var efc = this;
       // initialise
      efc.isEditMode = true;
      efc.accordion  = 2;
      efc.accordion = $routeParams.accordion;
  
      efc.estate = EstateDataService.getEstateById ( $routeParams.id );
      efc.setup  = EstateSetup.getSetup();
      efc.items  = EstateTranslateService.getHelp(); 

      if (angular.isDefined(efc.estate.eigenfix)){
        eigenfixbtn( efc.estate.eigenfix );
      } else {
        eigenfixbtn(0);
      }

      efc.estate.parsedDate = $filter('stringToDate')(efc.estate.startdate);

        
      //charts
      efc.chartObject            = {};
      efc.chartValueRestSchulden = [];
      efc.chartCashflow          = {};
      efc.chartValueCashflow     = [];
      efc.chartGaugeFaktor       = {};
      efc.chartGaugeRendite      = {};

       //init charts
      efc.chartObject.data   = {};
      efc.chartObject.type   = 'ColumnChart'; 
      efc.chartCashflow.data = {};
      efc.chartCashflow.type = 'ComboChart'; 

      // gauge chart
      efc.chartGaugeFaktor.data   = {};
      efc.chartGaugeFaktor.type   = 'Gauge'; 
      efc.chartGaugeRendite.data  = {};
      efc.chartGaugeRendite.type  = 'Gauge'; 

      // interval, runInterval: called during interval process, 
      var promise;
      startInterval();
      

      // accordion 
      if (efc.accordion != null && efc.accordion >= 0 && efc.accordion <= 8) {
        efc.estate.panels[efc.accordion] = true;
        scrollToPos("panel"+efc.accordion);
      }

      efc.scrollToPos = scrollToPos;
      efc.eigenfixbtn = eigenfixbtn;
      efc.updateHelp = updateHelp;
      efc.submitAction = submitAction;
      efc.cancelAction = cancelAction;
      efc.runInterval = runInterval;
      efc.startInterval = startInterval;
      efc.stopInterval = stopInterval;

      ////////

      function scrollToPos(panel) {
        $location.hash(panel);
        $anchorScroll();
      }

      function eigenfixbtn (fix) {
        efc.estate.eigenfix = fix;
        efc.eigenfix = fix;
        if (fix == 1) {
          efc.eigenfix1 = "active";
          efc.eigenfix2 = "";
        } else {
          efc.eigenfix1 = "";
          efc.eigenfix2 = "active";
        }
      }
     
      function updateHelp (selectedTransId){
        $rootScope.masterh  = selectedTransId;
      }

      function submitAction (action) {
        EstateDataService.updateEstate(efc.estate);
        efc.estateForm.$setPristine();
        if (!action) {
          window.history.back();
        }
      }

      function cancelAction() {
        window.history.back();
      }

      function runInterval() {
        if(efc.estateForm.$dirty) {
          submitAction(true);
        }
      }

      function startInterval(){
        stopInterval();
        promise = $interval(function(){ 
          runInterval(); 
        }, 300000);
      }

      function stopInterval() {
        $interval.cancel(promise);
      }

      $scope.$on("$routeChangeStart", function (event, next, current) {
        if (!efc.estateForm.$dirty) return;
        //$scope.showQuestionModal();
        var answer = confirm($filter('transSrv')('leavepage'))
        if (answer) {
          submitAction(true);
        }
      });

      $scope.$on('$destroy', function() {
        // Make sure that the interval is destroyed too
        stopInterval();
      });

    }
})();
