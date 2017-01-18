(function () {

    "use strict";

    angular.module('ZurealdjDjApp')
        .controller('SettingsController', ['$scope', '$state', '$timeout', 'SettingsFactory',
            function ($scope, $state, $timeout, settings) {

                $scope.I18n = I18n;

                $scope.activeEdit = 0;
                $scope.default_data = true;

                settings.show().success(function(data){
                    $scope.user = data;
                });

                $scope.save = function(){
                    $scope.processing = true;
                    settings.upsert($scope.user)
                        .success(function(){
                            $scope.activeEdit = 0;
                            $scope.processing = false;
                            $scope.user.password = null;
                            $scope.user.current_password = null;
                            $scope.user.password_confirmation = null;
                        })
                        .error(function(data){
                            $scope.processing = false;
                        })
                };

                var timer = false;
                $scope.$watch('user.notifications', function(){
                    if(timer){
                        $timeout.cancel(timer)
                    }
                    timer = $timeout(function(){
                        if(!$scope.default_data) {
                            settings.updateNotifications($scope.user)
                                .success(function(){

                                })
                                .error(function(data){

                                })
                        }
                        else{
                            $scope.default_data = false;
                        }
                    }, 500)
                }, true);
        }])
}());