(function () {

    "use strict";

    angular.module('ZurealdjDjApp')
        .controller('SettingsController', ['$scope', '$state', '$timeout', 'SettingsFactory',
            function ($scope, $state, $timeout, settings) {

                $scope.I18n = I18n;

                $scope.activeEdit = 0;
                $scope.step = false;

                $scope.isMobile = function(){
                    return window.navigator.userAgent.match(/iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile/i)? true: false;
                };

                $scope.updateSettings = function(){
                    settings.updateNotifications($scope.user)
                        .success(function(){

                        })
                        .error(function(data){

                        })
                };
                
                $scope.retrieveSettings = function() {
                    settings.show().success(function(data){
                        $scope.user = data;
                    });
                };

                $scope.retrieveSettings();

                $scope.cancel = function() {
                    $scope.step = false;
                    $scope.activeEdit = 0;
                    $scope.retrieveSettings();
                };

                $scope.save = function(){
                    $scope.processing = true;
                    settings.upsert($scope.user)
                        .success(function(){
                            $scope.step = false;
                            $scope.activeEdit = 0;
                            $scope.processing = false;
                            $scope.retrieveSettings();
                        })
                        .error(function(data){
                            $scope.processing = false;
                        })
                };
        }])
}());