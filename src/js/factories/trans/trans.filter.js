(function () {
    'use strict';

    angular
       .module('YieldEstateApp.Factories.Translate')
       .filter('transSrv', transSrv);

    transSrv.$inject = ['EstateTranslateService'];

    function transSrv (EstateTranslateService) {
          
       return function(label,arg0,arg1,arg2,arg3) {
        var translated = EstateTranslateService.getTrans(label);
        if (translated != null) {
            if (angular.isDefined(arg0)) {
                var i = 0;
                var regexp = new RegExp('\\{'+i+'\\}', 'gi');
                translated = translated.replace(regexp,arg0);
                if(angular.isDefined(arg1)){
                    i++;
                    regexp = new RegExp('\\{'+i+'\\}', 'gi');
                    translated = translated.replace(regexp,arg1);
                    if(angular.isDefined(arg2)){
                        i++;
                        regexp = new RegExp('\\{'+i+'\\}', 'gi');
                        translated = translated.replace(regexp,arg2);
                        if(angular.isDefined(arg3)){
                            i++;
                            regexp = new RegExp('\\{'+i+'\\}', 'gi');
                            translated = translated.replace(regexp,arg3);
                        }
                    }
                }
            }
            return translated;
        }
        return "label:"+label+":"+EstateTranslateService.getCurrentLanguage();
      }

    }
})();

