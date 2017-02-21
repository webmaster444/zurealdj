(function () {

    "use strict";

    angular.module('ZurealdjLandingApp')
        .controller('PasswordsController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce', 'PasswordsFactory',
            'SweetAlert',
            function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, passwords, SweetAlert) {
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
                            ngDialog.closeAll();

                            SweetAlert.swal({
                                title: "",
                                text: data.message,
                                confirmButtonColor: "#b05dfd",
                                confirmButtonText: "Ok",
                                closeOnConfirm: true,
                                customClass: "confirm-only"
                            });

                        })
                        .error(function(data){
                            $scope.formPending = false;
                        })
                };

                $scope.submitResetPassword = function(){
                    $scope.submitted = true;

                    $scope.formPending = true;
                    passwords.reset($scope.password, $scope.password_confirmation, $stateParams.token)
                        .success(function(data){
                            $scope.formPending = false;
                            $state.go('home');
                        })
                        .error(function(data){
                            $scope.formPending = false;
                        })

                };

            }])
}());