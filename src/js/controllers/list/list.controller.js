(function () {
    'use strict';

    angular
       .module('YieldEstateApp.Ctrl.EstateList')
       .controller('EstateListCtrl', EstateListCtrl);

    EstateListCtrl.$inject = ['$location','$filter','EstateDataService','$anchorScroll','EstateSetup'];

    function EstateListCtrl ($location,$filter,EstateDataService,$anchorScroll,EstateSetup) {
      var elc = this.
      debugger;
      elc.searchText = {};
      elc.estates = EstateDataService.getEstates();
      elc.setup = EstateSetup.getSetup()

     // elc.items   = EstateTranslateService.getHelp(); 
     
/*
      var titles = elc.estates.map(function(estates) {
        return {title: estates.title};
      });

      titles = $filter('orderBy')(titles, 'title');
*/
      
      elc.scrollToPos = scrollToPos;
      

      //////////

     
      function scrollToPos (panel) {
        $location.hash(panel);
        $anchorScroll();
      }

    }

})();

