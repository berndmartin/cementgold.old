(function () {
    'use strict';

    angular
       .module('YieldEstateApp.Ctrl.EstateDetails')
       .controller('EstateDetailsCtrl', EstateDetailsCtrl);

    EstateDetailsCtrl.$inject = ['$rootScope','$timeout','$location','$routeParams','EstateDataService','EstateSetup','log','$anchorScroll','EstateTranslateService'];

    function EstateDetailsCtrl ($rootScope,$timeout,$location,$routeParams,EstateDataService,EstateSetup,log,$anchorScroll,EstateTranslateService) {
      var edc = this;
  
      edc.estate = EstateDataService.getEstateById($routeParams.id);
      edc.setup  = EstateSetup.getSetup();
      edc.items  = EstateTranslateService.getHelp(); 
      edc.print  = false;
      
      edc.editAction = editAction;
      edc.deleteAction = deleteAction;
      edc.copyEstate = copyEstate;
      edc.printAction = printAction;
      edc.goToListView = goToListView;
      

      //charts
      edc.chartObject            = {};
      edc.chartValueRestSchulden = [];
      edc.chartCashflow          = {};
      edc.chartValueCashflow     = [];
      edc.chartGaugeFaktor       = {};
      edc.chartGaugeRendite      = {};

       //init charts
      edc.chartObject.data   = {};
      edc.chartObject.type   = 'ColumnChart'; 
      edc.chartCashflow.data = {};
      edc.chartCashflow.type = 'ComboChart'; 

      // gauge chart
      edc.chartGaugeFaktor.data   = {};
      edc.chartGaugeFaktor.type   = 'Gauge'; 
      edc.chartGaugeRendite.data   = {};
      edc.chartGaugeRendite.type   = 'Gauge'; 

      ///////

      
      function editAction(id) {
        $location.path('/estate/'+id+'/edit');
      }

      function deleteAction(id) {
        $location.path('/estate/'+id+'/delete');
      }

      function copyEstate(id) {
        $location.path('/estate/' + EstateDataService.copyEstateById(id) + '/edit');
      }
      
      function printAction (divName) {
        edc.print = true;
        
        var i = 0,
            list = [];

        while (edc.estate.panels[i] != undefined && i < 100) {
          if (!$edc.estate.panels[i]) {
            list.push(i);
          }
          edc.estate.panels[i] = true;
          i++;
        };

        $timeout(function() {
          if ($rootScope.DevicePlatform() === 'BROWSER') {  
            window.print();
          } else {
            
            var page = document.getElementById(divName);

            for (var i = 0; i < list.length + 1;i++ ){
              edc.estate.panels[list[i]] = false;
            }

            cordova.plugins.printer.print(page, 'Document.html', function () {
                alert('printing finished or canceled')
            });
            
    
          }
          edc.print = false;
        }, 2000);
      }

      function goToListView() {
        $location.path('/estates');
      }

      function editAccordion(id,accordion) {
        $location.path('/estate/'+id+'/edit/'+accordion);
      }

      function scrollToPos(panel) {
        $location.hash(panel);
        $anchorScroll();
      }
  

    }
})();
