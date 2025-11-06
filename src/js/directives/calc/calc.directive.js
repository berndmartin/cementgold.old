(function () {
    'use strict';

    angular
       .module('YieldEstateApp.Directive.EstateCalc')
       .directive('estateCalc', estateCalc);

    estateCalc.$inject = ['log','$window','$filter'];

    function estateCalc (log,$window,$filter) {
      
      var srv     = {
        id : 0,
        rest : 0,
        zins: 0,
        tilgung: 0,
        ein:0,
        aus:0,
        ueber: 0,
        date  : new Date(),
        newYear : new Date()
      };

      // Service impmementation
      srv.getRound = function(value,factor) {
        if (factor == null) {
          factor = 100;
        }
        return Math.round(value * factor) / factor;
      };

      srv.getUnit = function() {
        var tmp = new Date(srv.date);
        var unit = (
          {
            id      : srv.id,
            rest    : srv.rest,
            zins    : srv.zins,
            tilgung : srv.tilgung,
            ein     : srv.ein, 
            aus     : srv.aus,
            ueber   : srv.ueber,
            date    : ""+$filter('date')(tmp.setFullYear(srv.date.getFullYear() + srv.id - 1),"yyyy")
          }
        );

        srv.id++;
        return unit;
      };



      return {
        link: function (edcscope, element, attrs) {
          
          edcscope.$watchCollection('efc.estate', function(newNames,oldNames) {
            var scope = {};
            scope = edcscope.efc;
            
            log.debug("start estate_calc.js: "+scope.estate.startdate);

            scope.estate.startdate = scope.estate.parsedDate;
            log.debug("parsedDate= "+scope.estate.parsedDate);

              
            // startdatum
            if (scope.estate.startdate != null) {
              srv.date       = new Date(scope.estate.startdate);
            } else {
              srv.date       = new Date();
            }

            
            // notargebühren
            scope.estate.notargeb     = srv.getRound(scope.estate.kaufpreis * newNames.notar   / 100,1);
            // grunderwerbssteuer
            scope.estate.grerwstgeb   = srv.getRound(scope.estate.kaufpreis * newNames.grerwst / 100,1);
            // makler gebühren
            scope.estate.maklergeb    = srv.getRound(scope.estate.kaufpreis * newNames.makler  / 100,1);
            
            // calc total price for finance
            scope.estate.totalprice   = srv.getRound
                                      ( scope.estate.kaufpreis 
                                      + scope.estate.maklergeb  
                                      + scope.estate.grerwstgeb 
                                      + scope.estate.notargeb 
                                      + scope.estate.grundbuch
                                      + scope.estate.sonstigekosten 
                                      );

            if (scope.estate.finanzinklnk) {
              scope.estate.finanzierung = scope.estate.totalprice;
            } else {                      
              scope.estate.finanzierung = scope.estate.kaufpreis;
            }

            // kredit
            if (scope.estate.totalprice > 0 && scope.estate.finanzierung > 0) {
              // basis percent
              if (scope.eigenfix == 1) {
                scope.estate.eigenkap    = srv.getRound(scope.estate.finanzierung * newNames.eigenkapper / 100);
              } else {
                scope.estate.eigenkapper = srv.getRound(100 * (scope.estate.eigenkap / scope.estate.finanzierung));
              }
              scope.estate.fremdkap    = scope.estate.finanzierung - scope.estate.eigenkap;
              scope.estate.fremdkapper = 100 - scope.estate.eigenkapper;

              if (scope.estate.finanzierung < scope.estate.eigenkap) {
                scope.estate.fremdkap    = 0;
                scope.estate.fremdkapper = 0;
              }

            } else {
              scope.estate.fremdkap    = 0;
              scope.estate.fremdkapper = 0;
              scope.estate.eigenkap    = 0;
              scope.estate.eigenkapper = 0;
            }  
            // restschuld
            scope.estate.restschuld  = scope.estate.fremdkap;
            log.debug("estate_calc.js:restschuld:  ");
            

            // miete
            scope.estate.grundmietesum                 = srv.getRound(scope.estate.grundmiete * 12);
            scope.estate.hausverwaltungsum             = srv.getRound(scope.estate.hausverwaltung * 12);          
            scope.estate.instandhaltungsruecklagensum  = srv.getRound(scope.estate.instandhaltungsruecklagen * 12);
            scope.estate.mietausgabensum               = srv.getRound(scope.estate.hausverwaltungsum + scope.estate.instandhaltungsruecklagensum);
            scope.estate.nettomiete                    = srv.getRound(scope.estate.grundmietesum - scope.estate.mietausgabensum);
            scope.estate.ausfallrisikosum              = srv.getRound(scope.estate.nettomiete * scope.estate.ausfallrisiko / 100);
            scope.estate.mieteinnahmensum              = srv.getRound(scope.estate.nettomiete - scope.estate.ausfallrisikosum);
            

            // steuer
            scope.estate.grundstuecksanteilsum = scope.estate.grundstuecksanteil         * scope.estate.kaufpreis    / 100;
            scope.estate.wohnungsanteilsum     = (100 - scope.estate.grundstuecksanteil) * scope.estate.kaufpreis    / 100;
            scope.estate.abschreibungsum       = scope.estate.wohnungsanteilsum          * scope.estate.abschreibung / 100;
            scope.estate.steuerbasis           = scope.estate.grundmietesum 
                                               - scope.estate.abschreibungsum 
                                               - scope.estate.hausverwaltungsum
                                               - (scope.estate.zins * scope.estate.restschuld / 100);
            scope.estate.steuersum             = srv.getRound(scope.estate.steuer * scope.estate.steuerbasis / 100 );
            

            // analyse
            if (scope.estate.nettomiete != 0 && scope.estate.nettomiete != null) {
              scope.estate.factor = srv.getRound(scope.estate.totalprice / scope.estate.nettomiete,1);
            } else {
              scope.estate.factor = 0;
            }
            if (scope.estate.kaufpreis != 0 && scope.estate.kaufpreis != null) {
              scope.estate.bruttomietrendite  = srv.getRound(scope.estate.grundmietesum / scope.estate.kaufpreis * 100);
            }
            if (scope.estate.totalprice != 0 && scope.estate.totalprice != null) {
              scope.estate.nettomietrendite   = srv.getRound(scope.estate.nettomiete    / scope.estate.totalprice * 100);
            } else {
              scope.estate.nettomietrendite = 0;
            }
            // new
            if (scope.estate.totalprice - scope.estate.fremdkap != 0 ) {
              scope.estate.eigenkapitalrendite = ((scope.estate.mieteinnahmensum - (scope.estate.zins * scope.estate.fremdkap / 100) - scope.estate.steuersum ) / (scope.estate.totalprice - scope.estate.fremdkap)) * 100;
            } else {
              scope.estate.eigenkapitalrendite = 0;
            }
            if (scope.estate.totalprice != 0) {
              scope.estate.objektrendite = ((scope.estate.mieteinnahmensum - (scope.estate.steuer * (scope.estate.mieteinnahmensum - scope.estate.abschreibungsum) / 100 )) / scope.estate.totalprice) * 100;
            } else {
              scope.estate.objektrendite = 0;
            }
            if (scope.estate.fremdkap != 0) {
              scope.estate.fremdkapnsteuer = ((scope.estate.zins * scope.estate.fremdkap / 100) - scope.estate.steuersum ) / scope.estate.fremdkap * 100;
            } else {
              scope.estate.fremdkapnsteuer = 0;
            }


            log.debug("estate_calc.js:steuer:  ");
            // cashflow +++++++++++++
            scope.estate.sumzins    = 0;
            scope.estate.sumtilgung = 0;
            scope.estate.sumueber   = 0;
            scope.estate.sumein     = 0;
            scope.estate.sumaus     = 0;
            // lines reset
            scope.units                  = [];
            scope.chartValueRestSchulden = [];
            scope.chartValueCashflow     = [];
            // line reset ############################ year 0 #################################################################
            srv.id      = 0;
            srv.rest    = srv.getRound(scope.estate.fremdkap);
            srv.zins    = 0;
            srv.tilgung = 0;
            srv.annuita = srv.getRound(srv.rest * (scope.estate.zins + scope.estate.tilgung) / 100);  // this is fixed here
            srv.ein     = 0;
            srv.aus     = 0;
            srv.aus_z   = 0;
            srv.ueber   = 0;
            srv.test    = 0;
            // year 0
            scope.units.push(srv.getUnit());
            
            // loop ###########################################################################################################
            while ( srv.id < 10000 && srv.rest > 0 && ((scope.estate.laufzeit + 1) > srv.id  || scope.estate.infinite == true)) {
              //log.debug("loop rest: "+srv.rest);
              // recalc value
              srv.zins    = srv.getRound(srv.rest * scope.estate.zins / 100);              // zins berechnen
              srv.tilgung = Math.min(srv.rest,srv.getRound(srv.annuita - srv.zins));       // tilgung ist annulität minus zins
              srv.rest    = srv.getRound(srv.rest - srv.tilgung);                          // restschuld ist rest minus tilgung
              // einnahmen und ausgaben
              srv.ein     = srv.getRound(scope.estate.grundmietesum * Math.pow(1 + (scope.estate.einnahmedynamic / 100),srv.id - 1));
              // ausgaben 
              srv.aus_z   = (-1) * srv.zins;
              srv.aus_t   = (-1) * srv.tilgung;
              srv.aus_h   = (-1) * srv.getRound(scope.estate.hausverwaltungsum * Math.pow(1 + (scope.estate.kostendynamic / 100),srv.id - 1)); // hausverwaltung
              srv.aus_r   = (-1) * srv.getRound(scope.estate.instandhaltungsruecklagensum * Math.pow(1 + (scope.estate.kostendynamic / 100),srv.id - 1)); // instandhaltungsrücklagen
              srv.aus_a   = (-1) * srv.getRound((srv.ein - Math.abs(srv.aus_h) - Math.abs(srv.aus_r)) * scope.estate.ausfallrisiko / 100);     // ausfallrisiko    
              
              // abschreibung only max 100%
              if (srv.id * scope.estate.abschreibung > 100) {
                srv.abschreibsum2 = 0;
              } else {
                srv.abschreibsum2 = scope.estate.abschreibungsum;
              }

              srv.aus_s   = (-1) * srv.getRound((srv.ein - (srv.abschreibsum2 + Math.abs(srv.aus_h) + srv.zins)) * scope.estate.steuer / 100); // steuer
              // ausgabe ges.
              srv.aus     = srv.aus_z + srv.aus_t + srv.aus_h + srv.aus_r + srv.aus_a + srv.aus_s;             
              // cashflow ueber
              srv.ueber   = srv.getRound(srv.ein + srv.aus);
              // calc sum before 
              scope.estate.sumzins    = scope.estate.sumzins    + srv.zins;
              scope.estate.sumtilgung = scope.estate.sumtilgung + srv.tilgung;
              scope.estate.sumueber   = scope.estate.sumueber   + srv.ueber;
              scope.estate.sumaus     = scope.estate.sumaus     + srv.aus;
              scope.estate.sumein     = scope.estate.sumein     + srv.sumein;
              
             
              // write out #######################
              scope.chartValueRestSchulden.push(  {c: [{v: $filter('date')(srv.newYear.setFullYear(srv.date.getFullYear() + srv.id - 1), 'yy') },{v: (-1 * srv.rest)},] }  ) ;
              scope.chartValueCashflow.push(      {c: [{v: $filter('date')(srv.newYear.setFullYear(srv.date.getFullYear() + srv.id - 1), 'yy') },{v: srv.ein},{v: srv.aus_z},{v: srv.aus_t},{v: srv.aus_h},{v: srv.aus_r},{v: srv.aus_a},{v: srv.aus_s},{v: srv.ueber},] }  ) ;
              scope.units.push(srv.getUnit());
              /* end of loop */  
            }

            log.debug("end loop:  ");
         
            // sum of cashflow ######################################################################
            scope.estate.years      = srv.id - 1;
            scope.estate.restschuld = srv.rest;
            

            // draw charts restschuld ###############################################################
            var chartitlehAxis = $filter('transSrv')('hhjahr')
                               +" ("
                               +$filter('date')(scope.estate.startdate, 'yyyy')
                               +" - "
                               +$filter('date')(srv.newYear.setFullYear(srv.date.getFullYear() + scope.estate.years), 'yyyy')
                               +")";

            log.debug("restschuld chart:  ");
            scope.chartObject.type    = 'ColumnChart'; 
            scope.chartObject.data = 
            {"cols": 
              [
                {id: "yy", label: $filter('transSrv')('hhjahr')     , type: "string"},
                {id: "rs", label: $filter('transSrv')('restschuld') , type: "number"}
              ], 
              "rows":  scope.chartValueRestSchulden 
            };

            log.debug("chartObject chart:  ");

            scope.chartObject.options = {
              "title"               : $filter('transSrv')('restschuld')+" "+$filter('transSrv')('hhperannum'),
              "fill"                : 20,
              "isStacked"           : true,
              "displayExactValues"  : true,
              "vAxis": {
                "title": $filter('transSrv')('hhbetrag')+" "+scope.setup.currency,
                "gridlines": { "count": 10 }
              },
              "hAxis": {
                "title": chartitlehAxis
              },
              "tooltip": {
                "isHtml": false
              },
              "legend": {
                        position: "bottom"
              },
              "seriesType": "bars"
            };


            // draw chart cashflow  ############################################################
            log.debug("chart: ComboChart ");
            scope.chartCashflow.type    = 'ComboChart'; 
            scope.chartCashflow.data = 
            {"cols": 
              [
                {id: "yy"   , label: $filter('transSrv')('hhjahr')         , type: "string"},
                {id: "ein"  , label: $filter('transSrv')('miete')          , type: "number"},
                {id: "aus_z", label: $filter('transSrv')('zins')           , type: "number"},
                {id: "aus_t", label: $filter('transSrv')('tilgung')        , type: "number"},
                {id: "aus_h", label: $filter('transSrv')('hausverwaltung') , type: "number"},
                {id: "aus_r", label: $filter('transSrv')('ruecklagen')     , type: "number"},
                {id: "aus_a", label: $filter('transSrv')('ausfallrisiko')  , type: "number"},
                {id: "aus_s", label: $filter('transSrv')('steuer')         , type: "number"},
                {id: "cf"   , label: $filter('transSrv')('ueberschuss')    , type: "number"}
              ], 
              "rows":  scope.chartValueCashflow 
            };

            scope.chartCashflow.options = {
              "title"               : $filter('transSrv')('cashflow')+" "+$filter('transSrv')('hhperannum'),
              "fill"                : 20,
              "isStacked"           : true,
              "displayExactValues"  : true,
              "vAxis": {
                "title": $filter('transSrv')('hhbetrag')+" "+scope.setup.currency,
                "gridlines": { "count": 10 }
              },
              "hAxis": {
                "title": chartitlehAxis
              },
              "tooltip": {
                "isHtml": false
              },
              "legend": {
                        position: "bottom"
              },
              "seriesType": "bars",
              "series": {0: {type: "bars", isStacked: true},
                         1: {type: "bars", isStacked: true},
                         2: {type: "bars", isStacked: true},
                         3: {type: "bars", isStacked: true},
                         4: {type: "bars", isStacked: true},
                         5: {type: "bars", isStacked: true},
                         6: {type: "bars", isStacked: true},
                         7: {type: "line"}}
            };

            // draw charts gauge faktor ###############################################################
            log.debug("chart: Gauge I");       
            scope.chartGaugeFaktor.type    = 'Gauge'; 
            scope.chartGaugeFaktor.options = {
                  width: 120, height: 110,
                  redFrom: 24, redTo: Math.max(25,scope.estate.factor),
                  greenFrom: 10, greenTo: 16,
                  yellowFrom:16, yellowTo: 24,
                  min: 0, max: Math.max(25,scope.estate.factor),

                  minorTicks: 5
                };

            scope.chartGaugeFaktor.data = [
              ['Label', 'Value'],
              [$filter('transSrv')('factor'), scope.estate.factor]
             
            ];
      
            // draw charts gauge rendite ###############################################################
            log.debug("chart: Gauge II");    
            scope.chartGaugeRendite.type    = 'Gauge'; 
            scope.chartGaugeRendite.options = {
                  width: 120, height: 110,
                  redFrom: 0, redTo: 4,
                  yellowFrom: 4, yellowTo: 6,
                  greenFrom: 6, greenTo: Math.max(25,scope.estate.nettomietrendite),
                  min: 0, max: Math.max(7,scope.estate.nettomietrendite),
                  minorTicks: 5
                };

            scope.chartGaugeRendite.data = [
              ['Label', 'Value'],
              [$filter('transSrv')('hhrendite')+"%", scope.estate.nettomietrendite],
             
            ];
      
            log.debug("after draw chartObject: ");
            
  
       
          });
        }
      }
    }
})();
