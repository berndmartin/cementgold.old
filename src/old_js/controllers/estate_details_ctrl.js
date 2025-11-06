"use strict";

angular.module('YieldEstateApp.Ctrl.EstateDetails',[])
.controller('EstateDetailsCtrl', function ($scope,$rootScope,$timeout,$location,$routeParams,EstateDataService,EstateSetup,log,$anchorScroll,EstateTranslateService) {
  
  var id = $routeParams.id;
  $scope.estate = EstateDataService.getEstateById(id);
  $scope.setup  = EstateSetup.getSetup();
  $scope.items  = EstateTranslateService.getHelp(); 
  $scope.print  = false;
  
  

  $scope.editAction = function(id) {
    $location.path('/estate/'+id+'/edit');
  };

  $scope.deleteAction = function(id) {
    $location.path('/estate/'+id+'/delete');
  };

  $scope.copyEstate = function(id) {
    var newid = EstateDataService.copyEstateById(id);
    $location.path('/estate/'+newid+'/edit');
  };
  
  $scope.printAction = function (divName) {
    $scope.print = true;
    
    var i = 0;
    var list = [];
    while ($scope.estate.panels[i] != undefined && i < 100) {
      if (!$scope.estate.panels[i]) {
        list.push(i);
      }
      $scope.estate.panels[i] = true;
      i++;
    };

    $timeout(function() {
      if ($rootScope.DevicePlatform() === 'BROWSER') {  
        window.print();
      } else {
        
        var page = document.getElementById(divName);

        for (var i = 0; i < list.length + 1;i++ ){
          $scope.estate.panels[list[i]] = false;
        }

        // funzt $scope.estate.title
        cordova.plugins.printer.print(page, 'Document.html', function () {
            alert('printing finished or canceled')
        });
        
        /*
        var htmlbody = '' //data:text/html;
                     + '<!DOCTYPE html><html><head>' 
                     + '<link rel="stylesheet" href="css/app.min.css" />' 
                     + '<link rel="stylesheet" href="css/responsive.min.css" />' 
                     + '<link rel="stylesheet" href="css/hover.min.css" />' 
                     + '<link rel="stylesheet" type="text/css" href="css/estyle.css" />' 
                     + '</head><body>' + page + '</body></html>';
        

        $rootScope.goToEmail("",$scope.estate.title,htmlbody);*/
        //window.plugins.socialsharing.share('Message',$scope.estate.title, htmlbody, null);
      }
      $scope.print = false;
    }, 1000);
  }



  $scope.goToListView = function() {
    $location.path('/estates');
  };

  $scope.editAccordion = function(id,accordion) {
    log.debug("accordion: "+accordion);
    $location.path('/estate/'+id+'/edit/'+accordion);
  };

  $scope.scrollToPos = function(panel) {
    $location.hash(panel);
    $anchorScroll();
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
  $scope.chartGaugeRendite.data   = {};
  $scope.chartGaugeRendite.type   = 'Gauge'; 
   
 
});

  /* 
  $scope.printAction33 = function (divName) {
      $scope.print = true;
      
      var i = 0;s
      var list = [];
      while ($scope.estate.panels[i] != undefined && i < 100) {
        if (!$scope.estate.panels[i]) {
          list.push(i);
        }
        $scope.estate.panels[i] = true;
        i++;
      };

      $timeout(function() {
        var printContents = document.getElementById(divName).innerHTML;
        var originalContents = document.body.innerHTML;  

        log.debug(originalContents);

        if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
            var popupWin = window.open('', '_blank', 'width=600,height=600,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
            popupWin.window.focus();
            popupWin.document.write('<!DOCTYPE html><html><head>' +
                '<link rel="stylesheet" href="css/app.min.css" />' +
                '<link rel="stylesheet" href="css/responsive.min.css" />' +
                '<link rel="stylesheet" href="css/hover.min.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/estyle.css" />' +
                '</head><body onload="window.print()"><div class="reward-body">' + printContents + '</div></html>');
            popupWin.onbeforeunload = function (event) {
                popupWin.close();
                return '.\n';
            };
            popupWin.onabort = function (event) {
                popupWin.document.close();
                popupWin.close();
            }
        } else {
            var popupWin = window.open('', '_blank', 'width=800,height=600');
            popupWin.document.open();
            popupWin.document.write('<html><head><link rel="stylesheet" href="css/app.min.css" /><link rel="stylesheet" href="css/responsive.min.css" /><link rel="stylesheet" href="css/hover.min.css" /><link rel="stylesheet" type="text/css" href="css/estyle.css" /></head><body onload="window.print()">' + printContents + '</html>');
            popupWin.document.close();
        }
        popupWin.document.close();

        for (var i = 0; i < list.length + 1;i++ ){
          $scope.estate.panels[list[i]] = false;
        }
        return true;
        
      }, 1000);
  }
  */
  /*
  $scope.printActionD = function(id) {
    $scope.print = true;
    
    var i = 0;
    var list = [];
    while ($scope.estate.panels[i] != undefined && i < 100) {
      if (!$scope.estate.panels[i]) {
        list.push(i);
      }
      $scope.estate.panels[i] = true;
      i++;
    };

    $timeout(function() {
        window.print();
        $scope.print = false;
        for (var i = 0; i < list.length + 1;i++ ){
          $scope.estate.panels[list[i]] = false;
        }
    }, 2000);
  }
  */
