(function () {
    'use strict';

    var ALL = {
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
    };

    var BASE = {
        'USEMOCK'     : true
    };      

    var config = angular.extend(ALL,BASE);

    angular.module('common').constant('config', config);
})();

