(function () {
    'use strict';

    angular
    .module('YieldEstateApp.Services.EstateRoutes')
    .run(estateRun);

    estateRun.$inject = ['$rootScope','log','config','help'];

    function estateRun ($rootScope,log,config,help) {
     $rootScope.masterformel   = false;
     $rootScope.masterforward  = false;
     $rootScope.masterbackward = false;
     $rootScope.masterh        = "information";
     $rootScope.appHelp        = help;

     $rootScope.PrinterIsAvailable = function() {
        cordova.plugins.printer.isAvailable(
            function (isAvailable) {
                log.debug("Printer is available: "+isAvailable);
            });
    };

    $rootScope.DeviceInfo = function() {
        var deviceInfo;
        if (typeof(device) !== 'undefined' ) {
            deviceInfo  = 'Device Platform: ' + device.platform + '\n'
            + 'Device Version: '  + device.version  + '\n' 
            + 'Device Model: '    + device.model    + '\n' 
            + 'Device UUID: '     + device.uuid;
        } else {
            deviceInfo = 'Device Platform: BROWSER\n'
            + 'Device Version: \n' 
            + 'Device Model: \n' 
            + 'Device UUID: '    
        }
        log.debug("device: "+deviceInfo);
        return deviceInfo;  
    };
    $rootScope.DevicePlatform = function() {
        log.debug("devicePlatform: ");
        var devicePlatform;
        if (typeof(device) !== 'undefined' ) {
            devicePlatform = device.platform;
        } else {
            devicePlatform = "BROWSER";
        }
        return devicePlatform.toUpperCase();
    }

    $rootScope.goToLink = function( url, type , location ) {
        log.debug("platform: ");
        if (this.DevicePlatform().toUpperCase() === 'ANDROID') {
            navigator.app.loadUrl(endcodeURI(url), { openExternal: true });
        } else if (this.DevicePlatform().toUpperCase() === 'IOS') {
            if (!angular.isDefined(type)) {
                type = '_system';
            }
            if (!angular.isDefined(location)){
                location = 'location=yes';
            }
            window.open(encodeURI(url), type, location);
        } else {
            window.open(encodeURI(url),"_blank");
        }
        return;
    };
    $rootScope.goToEmail = function( mailto, subject, mailcontent ) { 
        if (this.DevicePlatform() === 'BROWSER') {    
            this.goToLink("mailto:"+mailto+"?subject:"+subject+"?body:"+mailcontent);    
        } else {
            var onSuccess, onError;
            window.plugins.socialsharing.shareViaEmail(
                  mailcontent, // can contain HTML tags, but support on Android is rather limited:  http://stackoverflow.com/questions/15136480/how-to-send-html-content-with-image-through-android-default-email-client
                  subject,
                  [mailto],  // TO: must be null or an array
                  null,      //['cc@person1.com'], // CC: must be null or an array
                  null,      // BCC: must be null or an array
                  null,      //['https://www.google.nl/images/srpr/logo4w.png','www/localimage.png'], FILES: can be null, a string, or an array
                  onSuccess, // called when sharing worked, but also when the user cancelled sharing via email (I've found no way to detect the difference)
                  onError    // called when sh*t hits the fan
                  );
        }
        return;
    };   
    $rootScope.sendTweet = function( tweet ) { 
        if (this.DevicePlatform() === 'BROWSER') {  
            this.goToLink("http://twitter.com/home?status="+tweet,"_blank","location=no");
        } else {      
            window.plugins.socialsharing.shareViaTwitter(tweet);
        }    
        return;
            //goToLink('http://twitter.com/home/?status='+aphorims.zitat+'%20'+aphorims.author+'%20%40'+appTwitter,'_blank','location=no')"
            //window.plugins.socialsharing.shareVia('com.apple.social.twitter', 'Message via Twitter', null, null, 'http://www.x-services.nl', function(){console.log('share ok')}, function(msg) {alert('error: ' + msg)})">message and link via Twitter on iOS</button>
        };

        $rootScope.goToMap = function(plz,address) {
            log.debug("goToMap: "+plz);
            var xadd = "";
            if (address != null) {
                xadd = xadd+address.replace(/\s/g, "+") + ",";
            }
            if (plz != null) {
                xadd = xadd+plz.replace(/\s/g, "+");
            }
            xadd = "https://www.google.de/maps/place/"+xadd;
            this.goToLink(xadd);
        };

        $rootScope.checkLanguage = function() {
            var lng = "NONE"; 
            if(typeof(navigator.globalization) !== "undefined") {
                lng = navigator.language;
                // Use cordova plugin to retrieve device's locale
                navigator.globalization.getPreferredLanguage(
                    function(language) {
                        lng = language.value;
                    },  
                    function(error) {
                        lng = error.value;
                    }
                    );
            }
            return lng;
        };
        
        $rootScope.serviceMailBody = function() {  
            var RN = '\n'; 
            return "ServiceInfo: "+RN
            +this.DeviceInfo()+RN
            +"AppName: "   +config.appName+RN
            +"AppVersion: "+config.appVersion+RN
            +"AppType: "   +config.appType+RN;
        };
        
        

    }
})();
