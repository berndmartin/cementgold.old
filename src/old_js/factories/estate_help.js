
"use strict";

var yhelp = angular.module('YieldEstateApp.Factories.Help',[]);



yhelp.factory('help', function ($rootScope,log) {
	var ItemList = ["information"];
	var ItemPos  = 0;
    return {
    	onItemSelected : function(selectedTransId) {
			log.debug('selectedTransId=' + selectedTransId);
			// go back in history of the array
			if (selectedTransId == "<") {
				ItemPos = Math.max(0,ItemPos - 1);
				$rootScope.masterh = ItemList[ItemPos];

			} 
			// go forward in history of array
			else if (selectedTransId == ">") {
				ItemPos = Math.min(ItemList.length - 1, ItemPos + 1);
				$rootScope.masterh = ItemList[ItemPos];
			} 
			// new 
			else { 
				// check if we are backward in array history, if so then remove other steps
				if (ItemPos != ItemList.length - 1) {
					ItemList = ItemList.splice(0,ItemPos + 1);
				}
				$rootScope.masterh = selectedTransId;
				if (ItemList[ItemList.length - 1] != selectedTransId){
					ItemList.push(selectedTransId);
				}
				ItemPos = ItemList.length -1;
			} 
			// is formel visible on the bottom
			$rootScope.masterformel   = (["steuersatz","zubesteuern","wohnungsanteil","abschreibung","ausfallrisiko","einnahmedynamic","kostendynamic","nettomiete","nonumlagefaehignebenkosten","annuitaet","tilgung","kaufnebenkosten","investitionskosten","makler","notar","grerwst","zins"].indexOf($rootScope.masterh)  > -1);
			$rootScope.masterforward  = ItemPos < ItemList.length -1; 
			$rootScope.masterbackward = ItemList.length - 1 > 0 && ItemPos != 0;
		}
	}
});





yhelp.directive('typeahead', function($timeout) {
  return {
    restrict: 'AEC',
    scope: {
                items: '=',
                prompt:'@',
                title: '@',
                subtitle:'@',
                model: '=',
                smodel: '=',
                onSelect:'&'
        },
        link:function(scope,elem,attrs){
           scope.handleSelection=function(selectedItem,selectedsTitle){
                 scope.model=selectedItem;
                 scope.smodel=selectedsTitle;
                 scope.current=0;
                 scope.selected=true;
                 $timeout(function(){
                         scope.onSelect();
                  },200);
          };
          scope.current=0;
          scope.selected=true;
          scope.isCurrent=function(index){
                 return scope.current==index;
          };
          scope.setCurrent=function(index){
                 scope.current=index;
          };
        },
    templateUrl: 'template-help.html'
  }
});

/*
yhelp.filter('getHelpFiles', ['EstateTranslateService',function ( EstateTranslateService ){
    return function() {
        return EstateTranslateService.getHelp();
    }
}]);
*/





