(function () {

    "use strict";

    angular.module('ZurealdjLandingApp')
        .controller('HomeController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce', 'SessionsFactory',
            'toaster',
            function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, sessions, toaster) {
                $timeout(function(){
                    if($scope.flash.error.length > 0){
                        toaster.pop('error', "", $scope.flash.error);
                    }
                    if($scope.flash.message.length > 0){
                        toaster.pop('success', "", $scope.flash.message);
                    }
                }, 1000);

                $scope.openLoginDialog = function(){
                    ngDialog.open({
                        templateUrl: 'landing/templates/sessions/new.html',
                        controller: 'SessionsController'
                    });
                };

                $scope.openRegistrationDialog = function(){

                }
            }])
}());