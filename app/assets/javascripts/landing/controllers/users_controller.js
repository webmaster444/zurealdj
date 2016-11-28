(function () {

    "use strict";

    angular.module('ZurealdjLandingApp')
        .controller('UsersController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce', 'SessionsFactory',
            function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, users) {
                $scope.I18n = I18n;
                $scope._ = _;
                $scope.$state = $state;
            }])
}());