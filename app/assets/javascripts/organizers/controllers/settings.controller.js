(function () {

    "use strict";

    angular.module('ZurealdjOrganizerApp')
        .controller('SettingsController', ['$scope', '$state', '$timeout', 'SettingsFactory',
            function ($scope, $state, $timeout, settings) {

                $scope.I18n = I18n;

                $scope.activeEdit = 0;

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
                    $scope.activeEdit = 0;
                    $scope.retrieveSettings();
                };

                $scope.save = function(){
                    $scope.processing = true;
                    settings.upsert($scope.user)
                        .success(function(){
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