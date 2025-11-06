(function () {
  'use strict';

  angular
  .module('YieldEstateApp.Ctrl.Setup')
  .controller('EstateSetupCtrl', EstateSetupCtrl);

  EstateSetupCtrl.$inject = ['$window','$rootScope','$route','$scope','$location','EstateSetup','log','$anchorScroll','EstateDataService','EstateTranslateService','$filter'];

  function EstateSetupCtrl   ($window, $rootScope,  $route,$scope,$location,EstateSetup,log,$anchorScroll,EstateDataService,EstateTranslateService,$filter) {
      var esc = this;
      
      var reload = false;

      esc.setupForm = {};
      // init
      esc.setup     = EstateSetup.getSetup();                       /*setup: qm, EUR, lang */
      esc.defestate = EstateDataService.getDefault();               /*default values       */
   //   esc.items     = EstateTranslateService.getHelp();             /*help items           */ 
      esc.languages = EstateTranslateService.getLanguages();        /*get available        */
      esc.curlang   = EstateTranslateService.getCurrentLanguage();  /*get current language */
      
      // set default language
      if (esc.setup.language == null) {
        esc.setup.language = esc.curlang;
      }

      
      esc.scrollToPos = scrollToPos;
      esc.submitAction = submitAction;
      esc.updateHelp = updateHelp;

      ////////

      /*
      esc.onItemSelected = onItemSelected;
      function onItemSelected(selectedTransId){
        log.debug('selectedTransId=' + selectedTransId);
        $scope.master       = selectedTransId;
        $scope.help_master  = "help"+selectedTransId;
      }
*/

      function scrollToPos(panel) {
        $location.hash(panel);
        $anchorScroll();
      }

      function submitAction() {
        EstateSetup.updatesetup(esc.setup);
        EstateDataService.setDefault(esc.defestate);
        esc.setupForm.$setPristine();
        if (reload) {
          $window.location.reload();
        }
      }

      function updateHelp(selectedTransId){
        $rootScope.masterh  = selectedTransId;
      }

      // watch language
      $scope.$watch('setup.language', function (newVal, oldVal) {
        if (newVal != oldVal ) {
          reload = true;
        }
      });

      $scope.$on("$routeChangeStart", function (event, next, current) {
        if (esc.setupForm.$dirty === 'undefined' || !esc.setupForm.$dirty) return;

        var answer = confirm($filter('transSrv')('leavepage'))
        if (answer) {
          submitAction();
        }
      });

    }
  })();
