(function () {
    'use strict';

    angular
       .module('YieldEstateApp.Services.EstateFilter')
       .filter('stringToDate', stringToDate);

   // stringToDate.$inject = [];

    function stringToDate () {
 	    return function (input) {
	        if (!input)
	            return null;

	        var date = new Date(input);
	        return date;
	    };

    }
})();

