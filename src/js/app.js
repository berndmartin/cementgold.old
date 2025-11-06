(function () {
  'use strict';


  angular
  .module('YieldEstateApp', [
    'common',
    'ngRoute',
    'mobile-angular-ui',
    'ngStorage',
    'googlechart',
    'YieldEstateApp.controllers.Main',
    'YieldEstateApp.Ctrl.EstateDelete',
    'YieldEstateApp.Ctrl.EstateDetails',
    'YieldEstateApp.Ctrl.EstateList',
    'YieldEstateApp.Ctrl.EstateForm',
    'YieldEstateApp.Ctrl.EstateEdit',
    'YieldEstateApp.Ctrl.Setup',
    'YieldEstateApp.Services.EstateRoutes',
    'YieldEstateApp.Services.EstateFilter',
    'YieldEstateApp.Directive.EstateCalc',
    'YieldEstateApp.Directive.EstateMap',
    'YieldEstateApp.Directive.EstateUrl',
    'YieldEstateApp.Directive.Centered',
    'YieldEstateApp.Factories.EstateAphorims',
    'YieldEstateApp.Factories.Data',
    'YieldEstateApp.Factories.Translate',
    'YieldEstateApp.Factories.Setup',
    'YieldEstateApp.Factories.Help'
    ]);

})();

