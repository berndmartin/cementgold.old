(function () {
    'use strict';

    angular
       .module('YieldEstateApp.Services.EstateFilter')
       .filter('sumByKey', sumByKey);

   // sumByKey.$inject = [];

    function sumByKey () {
  	    return function(data, key) {
	        if (typeof(data) === 'undefined' || typeof(key) === 'undefined') {
	            return 0;
	        }

	        var sum = 0,value;
	        for (var i = data.length - 1; i >= 0; i--) {
	            value = parseInt(data[i][key]);
	            if (angular.isNumber(value)){
	                sum += value;
	            }
	        }

	        return sum;
	    };
    }
})();

