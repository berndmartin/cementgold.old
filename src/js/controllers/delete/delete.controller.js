(function () {
    'use strict';

    angular
       .module('YieldEstateApp.Ctrl.EstateDelete')
       .controller('EstateDeleteCtrl', EstateDeleteCtrl);

    EstateDeleteCtrl.$inject = ['$routeParams', '$location', 'EstateDataService','$filter'];

    function EstateDeleteCtrl ($routeParams, $location, EstateDataService, $filter) {
	    var edc = this;

	    edc.estate = EstateDataService.getEstateById($routeParams.id);
	    edc.deleteEstate = deleteEstate;
	    edc.cancel = cancel;
	    ///////

		function deleteEstate(id) {
	        EstateDataService.deleteEstateById(id);
	        $location.path('/estates');
	    }

	    function cancel() {
	        window.history.back();
	    }
    }
})();
