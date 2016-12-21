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
                    ngDialog.closeAll();
                    ngDialog.open({
                        templateUrl: 'landing/templates/sessions/new.html',
                        controller: 'SessionsController',
                        scope: $scope
                    });
                };

                $scope.openRegistrationDialog = function(){
                    ngDialog.closeAll();
                    ngDialog.open({
                        templateUrl: 'landing/templates/users/new.html',
                        controller: 'UsersController',
                        scope: $scope
                    });
                };

                $scope.openForgotPasswordDialog = function(){
                    ngDialog.closeAll();
                    ngDialog.open({
                        templateUrl: 'landing/templates/passwords/new.html',
                        controller: 'PasswordsController',
                        scope: $scope
                    });
                };

                $scope.openRestorePasswordDialog = function(){
                    ngDialog.closeAll();
                    ngDialog.open({
                        templateUrl: 'landing/templates/passwords/restore.html',
                        controller: 'PasswordsController',
                        scope: $scope,
                        preCloseCallback: function() {
                            $state.go('home');
                            return true;
                        }
                    });
                };

                if($state.current.name == 'restore_password'){
                    $scope.openRestorePasswordDialog();
                }
            }])
}());