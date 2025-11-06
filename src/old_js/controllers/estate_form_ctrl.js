"use strict";

angular.module('YieldEstateApp.Ctrl.EstateForm',[])
.controller('EstateFormCtrl', function ($filter,$rootScope,$scope,$location,EstateDataService,EstateSetup,log,$anchorScroll,EstateTranslateService) {
  // init
  $scope.estate = EstateDataService.getDefault();
  $scope.setup  = EstateSetup.getSetup();
  $scope.items  = EstateTranslateService.getHelp(); 

  
  $scope.estate.startdate    = new Date(); 
  log.debug("startdate is: "+$scope.estate.startdate);
//  startdate                 : '2015-01-01T00:00:00.000Z',
  

  $scope.estate.parsedDate   = new Date(); 
  $scope.estate.createdate   = new Date();
  $scope.estate.panels[0]    = true;
  
  log.debug("default setup loaded: "+$scope.estate.notar);

  //charts
  $scope.chartObject            = {};
  $scope.chartValueRestSchulden = [];
  $scope.chartCashflow          = {};
  $scope.chartValueCashflow     = [];
  $scope.chartGaugeFaktor       = {};
  $scope.chartGaugeRendite      = {};
  
  
  log.debug("after init: ");
  $scope.estate.checklist.bath = 3;

  $scope.updateHelp = function(selectedTransId){
    $rootScope.masterh  = selectedTransId;
  };
  
  $scope.ToMap = function(plz,add){
    $rootScope.goToMap(plz,add);
  };
  $scope.ToLink = function(url){
    $rootScope.goToLink(url);
  };


  $scope.submitAction = function(action) {
    EstateDataService.storeEstate($scope.estate);
    $scope.estateForm.$setPristine();
    if (!action) {$location.path('/estate/'+$scope.estate.id+'/edit')};
  };

 
  $scope.cancelAction = function() {
    window.history.back();
  };

  $scope.scrollToPos = function(panel) {
    $location.hash(panel);
    $anchorScroll();
  };


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

  $scope.eigenfixbtn(0);
  
  $scope.$on("$routeChangeStart", function (event, next, current) {
    if (!$scope.estateForm.$dirty) return;
    //$scope.showQuestionModal();
    var answer = confirm($filter('transSrv')('leavepage'))
    if (answer) {
      $scope.submitAction(true);
    }
  });


  //init charts
  $scope.chartObject.data   = {};
  $scope.chartObject.type   = 'ColumnChart'; 
  $scope.chartCashflow.data = {};
  $scope.chartCashflow.type = 'ComboChart'; 
  // gauge chart
  $scope.chartGaugeFaktor.data   = {};
  $scope.chartGaugeFaktor.type   = 'Gauge'; 
  $scope.chartGaugeRendite.data   = {};
  $scope.chartGaugeRendite.type   = 'Gauge'; 

  
  log.debug("end controller: estate_form_ctrl ");
});

