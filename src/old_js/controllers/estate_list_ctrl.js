"use strict";

angular.module('YieldEstateApp.Ctrl.EstateList',[])
.controller('EstateListCtrl', function ($scope,$location,$filter,EstateDataService,log,$anchorScroll,EstateTranslateService) {
  $scope.sumtotalprice = 0;

  $scope.getEstateOrder = function(estates) {
    return estates.title;
  };

  $scope.estates = EstateDataService.getEstates();
  $scope.items   = EstateTranslateService.getHelp(); 
 
  var orderBy = $filter('orderBy');

  var titles = $scope.estates.map(function(estates) {
    return {title: estates.title};
  });

  titles = orderBy(titles, 'title');

  $scope.scrollToPos = function(panel) {
    $location.hash(panel);
    $anchorScroll();
  };

  $scope.cancel = function() {
    window.history.back();
  };
  
});
