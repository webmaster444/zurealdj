'use strict';

angular.module('countPicker', []);

angular.module('countPicker').directive('countpicker', ['$filter', function($filter) {

    function link($scope, element, attributes, ctrl) {

        if(!$scope.model) $scope.model = 0;

        $scope.inc = function() {
            $scope.model += 1;
        };

        $scope.dec = function() {
            if($scope.model > 0) $scope.model -= 1;
        };
    }

    return {
        link: link,
        restrict: 'A',
        require: 'ngModel',
        scope: {
            model: '=ngModel'
        },
        template: '' +
        '<div class="count-picker">' +
            '<a class="btn-dec" ng-click="dec()"> – </a>' +
            '<span class="count-value">{{ model }}</span>' +
            '<a class="btn-inc" ng-click="inc()"> + </a>' +
        '</div>'
    };
}]);