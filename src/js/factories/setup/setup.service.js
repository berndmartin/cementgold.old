(function () {
    'use strict';

    angular
       .module('YieldEstateApp.Factories.Setup')
       .factory('EstateSetup', EstateSetup);

    EstateSetup.$inject = ['config','$filter','$localStorage','log','$rootScope','EstateDataService'];

    function EstateSetup (config,$filter,$localStorage,log,$rootScope,EstateDataService) {
      
  

  var srv = {};
  var oldversion = "";
  //  localStorage.setItem('estates-setup',null);
  var saveName = "estates-setup";
  srv.saved   = localStorage.getItem(saveName);
  
  srv._setup = (localStorage.getItem(saveName)!==null) ? JSON.parse(srv.saved) :

    {
      currency    : '€',
      qm          : 'm²',
      language    : '',
      sid         : '',   // UUID of programm
      version     : '',   // version
      type        : '',   // type, internal type, e.g. iosbasic, iospremium
      install     : ''
    };


  if (angular.isDefined(srv._setup.version)) {
      oldversion = srv._setup.version;
  }
  if (!angular.isDefined(srv._setup.version) || srv._setup.version != config.appVersion) {
    srv._setup.version = config.appVersion;  
    srv._setup.type    = config.appType;
  }

  if (!angular.isDefined(srv._setup.install) || srv._setup.install === "") {
    var dd = ""+$filter('date')(new Date(),'yyyy-MM-ddTHH:mm:ss.sssZ','UTC');
    srv._setup.install = dd;
    log.debug("date: "+dd+"      :"+srv._setup.install);
  }


  // set the browser specific id
  if (!angular.isDefined(srv._setup.sid) || srv._setup.sid === "") {
    srv._setup.sid = EstateDataService.createUUID();
  }


  // set the language 
  if (!angular.isDefined(srv._setup.language) || srv._setup.language === "") {
    var lng     = $rootScope.checkLanguage().toLowerCase();
    var lngSh   = lng.substr(0,2).toLowerCase();
    // language initialise setup
    if (lng === "none" ) {
      srv._setup.language = "de";
    } else if (lngSh === "zh") {
      srv._setup.language = "zh-CN";
    } else if (["de","en","pt","fr","es","nl","it","ru","ja"].indexOf(lngSh) != -1 ) {
      srv._setup.language = lngSh;
    } else {
      srv._setup.language = "de";
    }

    // currency initialise update
    if (["de","pt","fr","es","nl","it","no","be","fi","el","ie","lu","si","mt","cy","sk","ee","lv"].indexOf(lngSh) != -1 ) {
      srv._setup.currency = '€';
    } else if ( lngSh === "ja" || lngSh === "zh" ) {
      srv._setup.currency = '¥';
    } else if  (lng === "en-gb" || lng === "en-uk") {
      srv._setup.currency = '£';
    } else {
      srv._setup.currency = '$';
    }

    // raummeter
    if (lng === "en-gb" || lng === "en-uk" || lng === "en-us") {
      srv._setup.qm = "sqft";
    }
 
  }

  // update function
  srv.versionUpdate = function(){
    log.debug("version update: old:"+oldversion+" new:"+srv._setup.version);
    if (srv._setup.language === "zh-CN") {
      log.debug("versionxxx"); 

    }
  };

  if (true || oldversion != srv._setup.version){
    srv.versionUpdate();
  }

  // save back to local storage for further use
  localStorage.setItem(saveName,JSON.stringify(srv._setup));

  // Service impmementation
  srv.getsetup = function() {
    return angular.copy(srv._setup);
  };

  srv.getsetupLng = function() {
    if (srv._setup.language != null && srv._setup.language != "") {
      return srv._setup.language;
    }
    return "de";
  };

  srv.updatesetup = function(setup) {
    log.debug("update setup");
    angular.extend(srv._setup, setup);
    localStorage.setItem(saveName,JSON.stringify(srv._setup));
    return;
  };

  // Public API
  return {
    getSetup: function() {
      return srv.getsetup();
    },
    updatesetup: function(setup) {
      return srv.updatesetup(setup);
    },
    getsetupLng: function() {
      return srv.getsetupLng();
    }
  };



    }
})();
