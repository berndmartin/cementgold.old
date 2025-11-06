(function () {
    'use strict';

    angular
       .module('YieldEstateApp.Factories.Data')
       .factory('EstateDataService', EstateDataService);

    EstateDataService.$inject = ['$localStorage'];

    function EstateDataService ($localStorage) {
        var service = {
          _estates : [],
          _defaults : {},

          getEstateById:getEstateById,
          copyEstateById:copyEstateById,
          cntEstates:cntEstates,
          storeEstate:storeEstate,
          getEstates:getEstates,
          updateEstate:updateEstate,
          deleteEstateById:deleteEstateById,
          getDefault:getDefault,
          setDefault:setDefault
     
        };

      getDefaultList();
      getEstateList();

      return service;

      /////////


       // service implementation
      function saveStorage() {
        localStorage.setItem('estates',JSON.stringify(service._estates));
      }

      // copy service
      function copyEstateById(id) {
        var tmpestate = getEstateById(id);
        tmpestate.title = "C/O " + tmpestate.title;
        return storeEstate(tmpestate);
      }

      // Service implementation
      function getEstateById(id) {
        var n = service._estates.length,
            returnvalue = null;
        for (var i = 0, n; i < n ; i++) {
          if (id === service._estates[i].id) {
            returnvalue =  angular.copy(service._estates[i]);
          }
        }
        return returnvalue;
      }

      // Service impmementation
      function getEstates (){
        return angular.copy(service._estates);
      }

      function storeEstate(estate) {
        estate.id = createUUID()
        service._estates.push(estate);
        saveStorage();
        return estate.id;
      }

      function getDefault() {
        
        return angular.copy(service._defaults);
      }

      function setDefault(defaults) {
        angular.extend(service._defaults,defaults);
        localStorage.setItem('estates-default',JSON.stringify(service._defaults));
      }

      function createUUID() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";

        var uuid = s.join("");
        return uuid;
      }


      function deleteEstateById(id) {
        var i = service._estates.length;
        while (i--) {
          if (id === service._estates[i].id) {
            service._estates.splice(i,1);
            saveStorage();
            return;
          }
        }
      }

      function cntEstates() {
        return service._estates.length;
      }

      function updateEstate(estate) {
        n = service._estates.length;
        for (var i = 0, n ;i < n; i++) {
          if (estate.id === service._estates[i].id) {
            angular.extend(service._estates[i], estate);
            saveStorage();
          }
        }
        return;
      }


      function getfromLS (value) {
        return localStorage.getItem(value);
      }

      function getDefaultList(){
        var defsaved = getfromLS('estates-default');
        service._defaults =  (localStorage.getItem('estates-default')!==null) ? JSON.parse(defsaved) :
          { 
            title                     : "New Real Estate ..",
            kostendynamic             : 2.01,
            einnahmedynamic           : 2.5,
            notar                     : 1.45,
            grerwst                   : 5,
            makler                    : 3.57,
            grundbuch                 : 365,
            eigenkap                  : 15000,
            zins                      : 2.5,  
            tilgung                   : 4.0,
            laufzeit                  : 15,
            hausverwaltung            : 21,
            instandhaltungsruecklagen : 22,
            abschreibung              : 2,
            ausfallrisiko             : 2.5,
            steuer                    : 26.55,
            checklist                 : {},
            qm                        : 1,
            sonstigekosten            : 0,
            kaufpreis                 : 0,
            panels                    : { 0: true,1: true,2: true,3: true,4: true,5: true,6: true,7: true,8: true,9: true}

          };
          localStorage.setItem('estates-default',JSON.stringify(service._defaults));

      }

      function getEstateList(){
        var saved = getfromLS('estates');

        service._estates =  (localStorage.getItem('estates')!== null && saved.length > 3) ? JSON.parse(saved) :

          [
            {
              title                     : 'e.g.: Wohnung in München',
              id                        : '0',
              link                      : '',
              url                       : 'http://en.wikipedia.org/wiki/Munich#mediaviewer/File:Munchen_collage.jpg',
              plz                       : '80331',
              address                   : 'Marienplatz 8',
              baujahr                   : '1909',
              qm                        : 24,
              grundstuecksanteil        : 3.5,
              kaufpreis                 : 118000,
              sonstigekosten            : 20,
              notar                     : 3.5,
              grerwst                   : 3.0,
              makler                    : 3.9,
              grundbuch                 : 180,
              eigenkapfix               : 0,
              eigenkap                  : 18000,
              eigenkapper               : 0,
              zins                      : 2.01,
              tilgung                   : 3.71,
              laufzeit                  : 15,
              infinite                  : false,  
              grundmiete                : 650,
              hausverwaltung            : 22,
              instandhaltungsruecklagen : 10,
              kostendynamic             : 2.0,
              einnahmedynamic           : 2.0,
              ausfallrisiko             : 2.5,
              abschreibung              : 2.0,
              steuer                    : 28,
              startdate                 : '2015-01-01',
              remark                    : 'Apartment in the central of Munich',
              panels                    : { 0: true,1: true,2: true,3: true,4: true,5: true,6: true,7: true,8: true,9: true},
              checklist                 : {}
              
            },
           {
              title                     : 'e.g.: Berlin property',
              id                        : '1',
              link                      : '',
              url                       : 'http://berliner-schloss.de/en/',
              plz                       : '10178',
              address                   : 'Schlossplatz 5',
              baujahr                   : '2019',
              qm                        : 130,
              grundstuecksanteil        : 5.55,
              kaufpreis                 : 440561,
              sonstigekosten            : 200,
              notar                     : 3.5,
              grerwst                   : 5.0,
              makler                    : 3.9,
              grundbuch                 : 375.9,
              eigenkapfix               : 0,
              eigenkap                  : 100000,
              eigenkapper               : 0,
              zins                      : 2.01,
              tilgung                   : 3.71,
              laufzeit                  : 15,
              infinite                  : false,  
              grundmiete                : 1950,
              hausverwaltung            : 24,
              instandhaltungsruecklagen : 18,
              kostendynamic             : 1.9,
              einnahmedynamic           : 2.0,
              ausfallrisiko             : 2.5,
              abschreibung              : 2.0,
              steuer                    : 40,
              startdate                 : '2015-01-01',
              remark                    : 'Beautifully situated apartment on the banks of the Spree in the middle of Berlin',
              panels                    :  { 0: true,1: true,2: false,3: false,4: false,5: false,6: false,7: false,8: false,9: false},
              checklist                 : {}
              
            },
            {
              title                     : 'e.g.: Noosa apartment',
              id                        : '2',
              link                      : '',
              url                       : 'http://en.wikipedia.org/wiki/Shire_of_Noosa#mediaviewer/File:Noosa.jpg',
              plz                       : '4567',
              address                   : 'Noosa Parade 46',
              baujahr                   : '1999',
              qm                        : 73,
              grundstuecksanteil        : 5.55,
              kaufpreis                 : 595000,
              sonstigekosten            : 200,
              notar                     : 3.5,
              grerwst                   : 5.0,
              makler                    : 3.9,
              grundbuch                 : 375.9,
              eigenkapfix               : 0,
              eigenkap                  : 125000,
              eigenkapper               : 0,
              zins                      : 2.01,
              tilgung                   : 3.71,
              laufzeit                  : 10,
              infinite                  : false,  
              grundmiete                : 3800,
              hausverwaltung            : 150,
              instandhaltungsruecklagen : 120,
              kostendynamic             : 1.9,
              einnahmedynamic           : 2.0,
              ausfallrisiko             : 2.5,
              abschreibung              : 2.0,
              steuer                    : 20,
              startdate                 : '2015-01-01',
              remark                    : 'Beautifully apartment on the banks of the Weyba Creek in Noosa, QLD',
              panels                    :  { 0: false,1: false,2: false,3: false,4: false,5: false,6: true,7: false,8: false,9: true},
              checklist                 : {}
              
            },

            {
              title                     : 'e.g.: New York flat',
              id                        : '3',
              link                      : '',
              url                       : 'http://en.wikipedia.org/wiki/Central_Park#mediaviewer/File:26_-_New_York_-_Octobre_2008.jpg',
              plz                       : 'New York',
              address                   : '2107-2109 Broadway',
              baujahr                   : '1903',
              qm                        : 94,
              grundstuecksanteil        : 0.55,
              kaufpreis                 : 2795000,
              sonstigekosten            : 200,
              notar                     : 4.5,
              grerwst                   : 5.0,
              makler                    : 6.9,
              grundbuch                 : 2000.0,
              eigenkapfix               : 0,
              eigenkap                  : 800000,
              eigenkapper               : 0,
              zins                      : 2.01,
              tilgung                   : 3.71,
              laufzeit                  : 20,
              infinite                  : false,  
              grundmiete                : 8500,
              hausverwaltung            : 300,
              instandhaltungsruecklagen : 100,
              kostendynamic             : 2.5,
              einnahmedynamic           : 2.8,
              ausfallrisiko             : 6.0,
              abschreibung              : 2.5,
              steuer                    : 30,
              startdate                 : '2015-01-01',
              remark                    : 'Beautifully flat near Central Park',
              panels                    :  { 0: false,1: false,2: true,3: true,4: false,5: false,6: false,7: false,8: false,9: false},
              checklist                 : {}
              
            }
          ];

          // get estates
          localStorage.setItem('estates',JSON.stringify( service._estates ));
      }



    }
})();
