angular.module('YieldEstateApp.Directive.Centered', [])
.directive("centered", function() {
	return {
	    restrict : "ECA",
	    transclude : true,
	    template : "<div class=\"angular-center-container\">\
	            <div class=\"angular-centered\" ng-transclude>\
	            </div>\
	          </div>"
	  };
	}
);
