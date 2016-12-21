(function () {

    "use strict";

    angular.module('ZurealdjDjApp')
        .controller('DashboardController', ['$scope', '$state', 'ngDialog', 'SessionsFactory', '$timeout', 'toaster',
            function ($scope, $state, ngDialog, session, $timeout, toaster) {

            $scope.I18n = I18n;
            $scope.$state = $state;
        }])
}());