(function () {
    'use strict';

    angular
       .module('YieldEstateApp.Ctrl.EstateForm')
       .controller('EstateFormCtrl', EstateFormCtrl);

    EstateFormCtrl.$inject = ['$filter','$rootScope','$scope','$location','EstateDataService','EstateSetup','log','$anchorScroll','EstateTranslateService'];

    function EstateFormCtrl ($filter,$rootScope,$scope,$location,EstateDataService,EstateSetup,log,$anchorScroll,EstateTranslateService) {
      var efc = this;
      efc.isEditMode = false;
      efc.accordion  = 2;
      efc.estate = EstateDataService.getDefault();
      efc.setup  = EstateSetup.getSetup();
      efc.items  = EstateTranslateService.getHelp(); 

      efc.estate.startdate    = new Date(); 
      //  startdate                 : '2015-01-01T00:00:00.000Z',
      
      efc.estate.parsedDate   = new Date(); 
      efc.estate.createdate   = new Date();
      efc.estate.panels[0]    = true;

      //charts
      efc.chartObject            = {};
      efc.chartValueRestSchulden = [];
      efc.chartCashflow          = {};
      efc.chartValueCashflow     = [];
      efc.chartGaugeFaktor       = {};
      efc.chartGaugeRendite      = {};
      
      efc.estate.checklist.bath = 3;

      eigenfixbtn(0);

      //init charts
      efc.chartObject.data   = {};
      efc.chartObject.type   = 'ColumnChart'; 
      efc.chartCashflow.data = {};
      efc.chartCashflow.type = 'ComboChart'; 
      // gauge chart
      efc.chartGaugeFaktor.data   = {};
      efc.chartGaugeFaktor.type   = 'Gauge'; 
      efc.chartGaugeRendite.data   = {};
      efc.chartGaugeRendite.type   = 'Gauge'; 


      efc.updateHelp = updateHelp;
      efc.ToMap = ToMap;
      efc.ToLink = ToLink;
      efc.submitAction = submitAction;
      efc.cancelAction = cancelAction;
      efc.scrollToPos = scrollToPos;
      efc.eigenfixbtn = eigenfixbtn;


      /////////////

      function updateHelp(selectedTransId){
        $rootScope.masterh  = selectedTransId;
      }
      
      function ToMap(plz,add){
        $rootScope.goToMap(plz,add);
      }

      function ToLink(url){
        $rootScope.goToLink(url);
      }

      function submitAction(action) {
        EstateDataService.storeEstate(efc.estate);
        efc.estateForm.$setPristine();
        if (!action) {$location.path('/estate/'+efc.estate.id+'/edit')};
      }

      function cancelAction() {
        window.history.back();
      }

      function scrollToPos (panel) {
        $location.hash(panel);
        $anchorScroll();
      }


      function eigenfixbtn(fix) {
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

      
      $scope.$on("$routeChangeStart", function (event, next, current) {
        if (!efc.estateForm.$dirty) return;
        //$scope.showQuestionModal();
        var answer = confirm($filter('transSrv')('leavepage'))
        if (answer) {
          submitAction(true);
        }
      });

    }
})();
