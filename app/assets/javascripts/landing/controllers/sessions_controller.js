(function () {

    "use strict";

    angular.module('ZurealdjLandingApp')
        .controller('SessionsController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce',
            'SessionsFactory',
            function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, sessions) {
                $scope.I18n = I18n;
                $scope._ = _;
                $scope.$state = $state;

                $scope.session = {};

                $scope.submitLoginCredentials = function(){
                    $scope.submitted = true;

                    $scope.processing = true;
                    sessions.login($scope.session)
                        .success(function(data){
                            $scope.processing = false;
                            window.location = '/' + data.redirect_url;
                        })
                        .error(function(data){
                            $scope.processing = false;
                        })
                };

                $scope.loginViaFacebook = function(){

                    var loginCallback = function(token){
                        sessions.facebook(token).success(function(){
                            $scope.processing = false;
                            // window.location = '/' + data.redirect_url;
                        });
                    };

                    FB.getLoginStatus(function(response){
                        if(response.authResponse){
                            loginCallback(response.authResponse.accessToken)
                        }else{
                            FB.login(function(response){
                                loginCallback(response.authResponse.accessToken)
                            })
                        }
                    })
                }
            }])
}());