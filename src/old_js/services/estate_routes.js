"use strict";

angular.module('YieldEstateApp.Services.EstateRoutes',[])
.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'home.html', 
    reloadOnSearch: false
  })
  .when('/estates', {
  	templateUrl: 'estate_list.html',
  	controller: 'EstateListCtrl', 
    reloadOnSearch: false
  })
  .when('/estates/:id' ,{
  	templateUrl: 'estate_details.html',
  	controller: 'EstateDetailsCtrl', 
    reloadOnSearch: false
  })
  .when('/estate/new' ,{
  	templateUrl: 'estate_form.html',
  	controller: 'EstateFormCtrl', 
    reloadOnSearch: false
  })
 .when('/estate/:id/edit' ,{
  	templateUrl: 'estate_form.html',
  	controller: 'EstateEditCtrl', 
    reloadOnSearch: false
  })
 .when('/estate/:id/edit/:accordion' ,{
    templateUrl: 'estate_form.html',
    controller: 'EstateEditCtrl', 
    reloadOnSearch: false
  })
 .when('/estate/:id/delete', {
    templateUrl: 'estate_delete.html',
    controller: 'EstateDeleteCtrl', 
    reloadOnSearch: false
  })
 .when('/setup', {
    templateUrl: 'setup.html',
    controller: 'EstateSetupCtrl', 
    reloadOnSearch: false
  })
 .when('/impressum', {
    templateUrl: 'impressum.html',
    reloadOnSearch: false
  })
 .when('/contact', {
    templateUrl: 'contact.html',
    reloadOnSearch: false
  })
  .otherwise({
  	templateUrl: 'error.html', 
    reloadOnSearch: false
  });

});


