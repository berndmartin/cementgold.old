(function () {
    'use strict';

    angular
       .module('YieldEstateApp.Services.EstateRoutes')
       .config(estateConfig);

    estateConfig.$inject = ['$routeProvider'];

    function estateConfig ($routeProvider) {
      
 
      $routeProvider
      .when('/', {
        templateUrl: 'home.html', 
        reloadOnSearch: false
      })
      .when('/estates', {
      	templateUrl: 'estate_list.html',
      	controller: 'EstateListCtrl', 
        controllerAs: 'elc',
        reloadOnSearch: false
      })
      .when('/estates/:id' ,{
      	templateUrl: 'estate_details.html',
      	controller: 'EstateDetailsCtrl', 
        controllerAs: 'edc',
        reloadOnSearch: false
      })
      .when('/estate/new' ,{
      	templateUrl: 'estate_form.html',
      	controller: 'EstateFormCtrl', 
        controllerAs: 'efc',
        reloadOnSearch: false
      })
     .when('/estate/:id/edit' ,{
      	templateUrl: 'estate_form.html',
      	controller: 'EstateEditCtrl', 
        controllerAs: 'efc',
        reloadOnSearch: false
      })
     .when('/estate/:id/edit/:accordion' ,{
        templateUrl: 'estate_form.html',
        controller: 'EstateEditCtrl', 
        controllerAs: 'efc',
        reloadOnSearch: false
      })
     .when('/estate/:id/delete', {
        templateUrl: 'estate_delete.html',
        controller: 'EstateDeleteCtrl', 
        controllerAs: 'edc',
        reloadOnSearch: false
      })
     .when('/setup', {
        templateUrl: 'setup.html',
        controller: 'EstateSetupCtrl', 
        controllerAs: 'esc',
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

    }
})();



