'use strict';

angular.module('dj.scroll', []);

angular.module('dj.scroll').directive('djScroll', ['$compile', function($compile) {

    return {
        scope: true,
        link: function(scope, element, attrs) {
            $(element).slimScroll({ height: element.css('height')});
            element.removeAttr('dj-scroll');
            $compile(element)(scope);
        }
    };
}]);
