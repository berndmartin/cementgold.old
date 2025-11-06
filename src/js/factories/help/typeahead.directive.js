(function () {
    'use strict';

    angular
       .module('YieldEstateApp.Factories.Help')
       .directive('typeahead', typeahead);

    typeahead.$inject = ['$timeout'];

    function typeahead ($timeout) {
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

    }    
})();



