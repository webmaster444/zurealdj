(function () {

    "use strict";

    angular.module('ZurealdjLandingApp')
        .controller('UsersController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce',
            'SessionsFactory',
            function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, users) {
                $scope.I18n = I18n;
                $scope._ = _;
                $scope.$state = $state;

                $scope.isMobile = function(){
                    return window.navigator.userAgent.match(/iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile/i)? true: false;
                };
            }])
}());