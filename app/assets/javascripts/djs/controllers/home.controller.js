(function () {

    "use strict";

    angular.module('ZurealdjDjApp')
        .controller('HomeController', ['$scope', '$state', 'ngDialog', 'SessionsFactory', '$timeout', 'toaster', 'UsersFactory',
            function ($scope, $state, ngDialog, session, $timeout, toaster, users) {

            $scope.I18n = I18n;
            $scope.$state = $state;

            $scope.checkSession = function(){
                session.check()
                        .success(function(data){
                            $scope.current_user = data.current_user;
                        })
                        .error(function(){
                            $scope.current_user = false;
                        });
            };

            $scope.checkSession();

            users.profile().success(function(data){
                $scope.$current_user = data;
            });

            $scope.logout = function(){
                session.logout().success(function(){
                    window.location = '/'
                })
            };

            $timeout(function(){
                if($scope.flash.error.length > 0){
                    toaster.pop('error', "", $scope.flash.error);
                }
                if($scope.flash.message.length > 0){
                    toaster.pop('success', "", $scope.flash.message);
                }
            }, 1000);

            $scope.changeLanguage = function(locale){
                I18n.locale = locale;
            }
        }])
}());