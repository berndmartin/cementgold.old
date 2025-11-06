"use strict";

angular.module('YieldEstateApp.Ctrl.EstateEdit',[])
.controller('EstateEditCtrl', function ($filter,$rootScope,$scope,$routeParams,$location,EstateDataService,log,$anchorScroll,EstateTranslateService,EstateSetup,$interval) {
  // initialise
  $scope.isEditMode = true;
  $scope.accordion  = 2;
  
  var id = $routeParams.id;
  
  $scope.accordion = $routeParams.accordion;
  log.debug("editEstate: "+id);
  log.debug("accordion: "+$scope.accordion);

  $scope.estate = EstateDataService.getEstateById(id);
  $scope.setup  = EstateSetup.getSetup();
  $scope.items  = EstateTranslateService.getHelp(); 

  $scope.scrollToPos = function(panel) {
    $location.hash(panel);
    $anchorScroll();
  }

  $scope.eigenfixbtn = function(fix) {
    $scope.estate.eigenfix = fix;
    $scope.eigenfix = fix;
    if (fix == 1) {
      $scope.eigenfix1 = "active";
      $scope.eigenfix2 = "";
    } else {
      $scope.eigenfix1 = "";
      $scope.eigenfix2 = "active";
    }
  };

 
  $scope.updateHelp = function(selectedTransId){
    $rootScope.masterh  = selectedTransId;
  };
    

  if (angular.isDefined($scope.estate.eigenfix)){
    $scope.eigenfixbtn($scope.estate.eigenfix);
  } else {
    $scope.eigenfixbtn(0);
  }

  $scope.estate.parsedDate = $filter('stringToDate')($scope.estate.startdate);
  

  $scope.submitAction = function(action) {
    EstateDataService.updateEstate($scope.estate);
    $scope.estateForm.$setPristine();
    if (!action) {window.history.back();}
  };

  $scope.$on("$routeChangeStart", function (event, next, current) {
    if (!$scope.estateForm.$dirty) return;
    //$scope.showQuestionModal();
    var answer = confirm($filter('transSrv')('leavepage'))
    if (answer) {
      $scope.submitAction(true);
    }
  });

  $scope.cancelAction = function() {
    window.history.back();
  };

    
  //charts
  $scope.chartObject            = {};
  $scope.chartValueRestSchulden = [];
  $scope.chartCashflow          = {};
  $scope.chartValueCashflow     = [];
  $scope.chartGaugeFaktor       = {};
  $scope.chartGaugeRendite      = {};

   //init charts
  $scope.chartObject.data   = {};
  $scope.chartObject.type   = 'ColumnChart'; 
  $scope.chartCashflow.data = {};
  $scope.chartCashflow.type = 'ComboChart'; 

  // gauge chart
  $scope.chartGaugeFaktor.data   = {};
  $scope.chartGaugeFaktor.type   = 'Gauge'; 
  $scope.chartGaugeRendite.data  = {};
  $scope.chartGaugeRendite.type  = 'Gauge'; 

  // interval, runInterval: called during interval process, 
  var promise;
  $scope.runInterval = function() {
    if($scope.estateForm.$dirty) {
      log.debug("save runInterval: ");
      $scope.submitAction(true);
    }
  };
  $scope.startInterval = function(){
    $scope.stopInterval();
    promise = $interval(function(){ $scope.runInterval(); }, 300000);
  };
  $scope.stopInterval = function() {
    $interval.cancel(promise);
  };
  $scope.startInterval();
  $scope.$on('$destroy', function() {
    // Make sure that the interval is destroyed too
    $scope.stopInterval();
  });

  // accordion 
  if ($scope.accordion != null && $scope.accordion >= 0 && $scope.accordion <= 8) {
    log.debug("goToPanel: "+$scope.accordion);
    $scope.estate.panels[$scope.accordion] = true;
    $scope.scrollToPos("panel"+$scope.accordion);
  }
  log.debug("end: controller  ");

});
