"use strict";

angular.module('YieldEstateApp', [
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
])
.constant('config', {
    appName       : 'Cement Gold',
    appCompany    : 'Bernd Martin',
    appVersion    : '1.1.0',
    appType       : 'basic',                   // basic,business,premium
    // temp
    apiUrl        : 'bmline.de/cementgold',
    appEmail      : 'CementGold@bmline.de',
    appTwitter    : 'CementGold',
    appHashWish   : 'cgfavored',
    appShopApple  : 'bmline.de/cgapple',
    appShopAndroid: 'bmline.de/cgandroid',
    appShopWindows: 'bmline.de/cgwindows',
    appTest       : true
});




/* not used ............................
yieldApp.directive("centered", function() {
  return {
    restrict : "ECA",
    transclude : true,
    template : "<div class=\"angular-center-container\">\
            <div class=\"angular-centered\" ng-transclude>\
            </div>\
          </div>"
  };
});  */



