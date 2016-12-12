(function () {

    "use strict";

    angular.module('ZurealdjLandingApp')
        .controller('PasswordsController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce', 'PasswordsFactory',
            function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, passwords) {
                $scope.I18n = I18n;
                $scope._ = _;
                $scope.$state = $state;

                $scope.isMobile = function(){
                    return window.navigator.userAgent.match(/iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile/i)? true: false;
                };

                $scope.submitForgotPassword = function(){
                    $scope.submitted = true;

                    $scope.formPending = true;
                    passwords.forgot($scope.email)
                        .success(function(data){
                            $scope.formPending = false;
                            $state.go('login');
                        })
                        .error(function(data){
                            $scope.formPending = false;
                        })
                };

                $scope.submitResetPassword = function(){
                    $scope.submitted = true;

                    $scope.formPending = true;
                    passwords.reset($scope.password, $scope.password_confirmation)
                        .success(function(data){
                            $scope.formPending = false;
                            $state.go('login');
                        })
                        .error(function(data){
                            $scope.formPending = false;
                        })

                };

            }])
}());