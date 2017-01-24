(function () {

    "use strict";

    angular.module('ZurealdjOrganizerApp')
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
            if($state.current.name != 'login'){
                $scope.checkSession();
            }

            $scope.retrieveCurrentUser = function(){
                users.profile().success(function(data){
                    $scope.$current_user = data;
                });
            };
            $scope.retrieveCurrentUser();

            $scope.$state = $state;

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
            };

            $scope.openMobileMenu = function(){
                ngDialog.open({
                    template: 'organizers/templates/common/mobile-navbar-menu.html',
                    className: 'dj-mobile-ng-dialog mobile-only',
                    scope: $scope,
                    showClose: false,
                    closeByNavigation: true
                });
            }
        }])
}());