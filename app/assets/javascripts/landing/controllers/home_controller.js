(function () {

    "use strict";

    angular.module('ZurealdjLandingApp')
        .controller('HomeController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce', 'SessionsFactory',
            'toaster',
            function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, sessions, toaster, slides) {
                $timeout(function(){
                    if($scope.flash.error.length > 0){
                        toaster.pop('error', "", $scope.flash.error);
                    }
                    if($scope.flash.message.length > 0){
                        toaster.pop('success', "", $scope.flash.message);
                    }
                }, 1000);

                $scope.$state = $state;

                $scope.isMobile = function(){
                    return window.navigator.userAgent.match(/iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile/i)? true: false;
                };

                $scope.ngDialogClose = ngDialog.closeAll;

                $scope.ngDialogParams = {
                    width: $scope.isMobile()? 'auto' : 400,
                    className: $scope.isMobile()? 'zdj-ngdialog': 'ngdialog-theme-default'
                };

                $scope.openLoginDialog = function(){
                    ngDialog.closeAll();
                    ngDialog.open({
                        templateUrl: 'landing/templates/sessions/new.html',
                        controller: 'SessionsController',
                        scope: $scope,
                        width: $scope.ngDialogParams.width,
                        className: $scope.ngDialogParams.className,
                        disableAnimation: true
                    });
                };

                $scope.openRegistrationDialog = function(role = null){

                    $scope.userrole = role;
                    ngDialog.closeAll();
                    ngDialog.open({
                        templateUrl: 'landing/templates/users/new.html',
                        controller: 'UsersController',
                        scope: $scope,
                        width: $scope.ngDialogParams.width,
                        className: $scope.ngDialogParams.className,
                        disableAnimation: true
                    });
                };

                $scope.openForgotPasswordDialog = function(){
                    ngDialog.closeAll();
                    ngDialog.open({
                        templateUrl: 'landing/templates/passwords/new.html',
                        controller: 'PasswordsController',
                        scope: $scope,
                        width: $scope.ngDialogParams.width,
                        className: $scope.ngDialogParams.className,
                        disableAnimation: true
                    });
                };

                $scope.openRestorePasswordDialog = function(){
                    ngDialog.closeAll();
                    ngDialog.open({
                        templateUrl: 'landing/templates/passwords/restore.html',
                        controller: 'PasswordsController',
                        scope: $scope,
                        width: $scope.ngDialogParams.width,
                        className: $scope.ngDialogParams.className,
                        disableAnimation: true,
                        preCloseCallback: function() {
                            $state.go('home');
                            return true;
                        }
                    });
                };

                if($state.current.name == 'restore_password'){
                    $scope.openRestorePasswordDialog();
                }

                $scope.checkSession = function(){
                    sessions.check()
                        .success(function(data){
                            $scope.current_user = data.current_user;
                        })
                        .error(function(){
                            $scope.current_user = false;
                        });
                };

                $scope.checkSession();

                $scope.logout = function(){
                    sessions.logout().success(function(){
                        window.location = '/'
                    })
                };

                $scope.scroll = function(){
                    $("body").animate({ scrollTop: $('.page-head').height() + 10 }, '500', 'swing');
                }
            }])
}());