"use strict";

angular.module('YieldEstateApp.Ctrl.Setup',[])
.controller('EstateSetupCtrl', function ($window,$rootScope,$route,$scope,$location,EstateSetup,log,$anchorScroll,EstateDataService,EstateTranslateService,$filter) {
  // init
  $scope.setup     = EstateSetup.getSetup();                       /*setup: qm, EUR, lang */
  $scope.defestate = EstateDataService.getDefault();               /*default values       */
  $scope.items     = EstateTranslateService.getHelp();             /*help items           */ 
  $scope.languages = EstateTranslateService.getLanguages();        /*get available        */
  $scope.curlang   = EstateTranslateService.getCurrentLanguage();  /*get current language */
  var reload = false;

  // set default language
  if ($scope.setup.language == null) {
    $scope.setup.language = $scope.curlang;
  }


  log.debug("after init setup: "+$scope.languages);
  log.debug("currentlang: '"+$scope.curlang+"' :'"+$scope.setup.language+"''    ");
  
  $scope.onItemSelected = function(selectedTransId){
    log.debug('selectedTransId=' + selectedTransId);
    $scope.master       = selectedTransId;
    $scope.help_master  = "help"+selectedTransId;
  };


  $scope.scrollToPos = function(panel) {
    $location.hash(panel);
    $anchorScroll();
  };

  $scope.submitAction = function() {
    EstateSetup.updatesetup($scope.setup);
    EstateDataService.setDefault($scope.defestate);
    $scope.setupForm.$setPristine();
    if (reload) {$window.location.reload();}
  };

  $scope.updateHelp = function(selectedTransId){
    $rootScope.masterh  = selectedTransId;
  };
  


  // watch language
  $scope.$watch('setup.language', function (newVal, oldVal) {
    log.debug("after watch language: "+newVal+" "+oldVal);
    if (newVal != oldVal ) {
      reload = true;
    }
  });

  // 

  
/*
  $scope.showQuestionModal = function () {
    log.debug("showQuestionModal");
    var uiturnon = angular.element($document).find("modal-overlay");  // Finding
    log.debug("ui :"+uiturnon);

uiturnon.on('question');






    log.debug("after: "+uiturnon);

    var modalOptions    = {
        closeButtonText: 'Cancel',
        actionButtonText: 'Save',
        templateUrl : 'question.html',
        headerText: 'Save Dialog'
    }
    modalService.showModal({}, modalOptions).then(function (result) {
      log.debug("result: "+result);

    });
  }
  */
  

/*
  $scope.$on('$destroy', function(e){
    $window.onbeforeunload = undefined;
  });

  window.onbeforeunload = function (event) {        
    //Check if there was any change, if no changes, then simply let the user leave
    if($location.path() != '/setup' || !$scope.setupForm.$dirty){
      return;
    }

    var message = $filter('transSrv')('leavepage');
    if (typeof event == 'undefined') {
      event = window.event;
    }
    if (event) {
      event.returnValue = message;
    }
    return message;
  };
*/
  $scope.$on("$routeChangeStart", function (event, next, current) {
    if (!$scope.setupForm.$dirty) return;
    //$scope.showQuestionModal();
    

    var answer = confirm($filter('transSrv')('leavepage'))
    if (answer) {
      $scope.submitAction();
    }
  });



});
