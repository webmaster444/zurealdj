(function () {

    "use strict";

    angular.module('ZurealdjLandingApp')
        .controller('UsersController', ['$scope', '$state', 'ngDialog', 'UsersFactory', 'SweetAlert',
            function ($scope, $state, ngDialog, users, SweetAlert) {
                $scope.I18n = I18n;
                $scope._ = _;
                $scope.$state = $state;

                $scope.user = {};
                $scope.user.user_type = $scope.userrole;
                $scope.submit = function(){
                    $scope.processing = true;
                    users.create($scope.user)
                        .success(function(data){
                            $scope.processing = false;
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
                            $scope.validation_errors = data.validation_errors;
                            $scope.processing = false;
                        })
                };

                $scope.signupViaFacebook = function(){
                    var loginCallback = function(token){
                        $scope.processing = true;
                        users.facebook($scope.user, token)
                            .success(function(data){
                                $scope.processing = false;
                                window.location = '/' + data.redirect_url;
                            })
                            .error(function(data){
                                $scope.validation_errors = data.validation_errors;
                                $scope.processing = false;
                            })
                    };

                    FB.getLoginStatus(function(response){
                        if(response.authResponse){
                            loginCallback(response.authResponse.accessToken)
                        }else{
                            FB.login(function(response){
                                loginCallback(response.authResponse.accessToken)
                            }, {scope: 'email'})
                        }
                    });
                }
            }])
}());