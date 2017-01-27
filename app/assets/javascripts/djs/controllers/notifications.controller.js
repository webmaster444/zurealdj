(function () {

    "use strict";

    angular.module('ZurealdjDjApp')
        .controller('NotificationsController', ['$scope', '$state', '$timeout', 'NotificationsFactory', function ($scope, $state, $timeout, notifications) {

            $scope.notification_groups = [];
            $scope.page = 0;

            $scope.retrieveNotifications = function(){
                $scope.page += 1;
                notifications.all({page: $scope.page, per_page: 10}).success(function(data){
                    $scope.notification_groups = $scope.notification_groups.concat(data.notifications);
                })
            };

            $scope.retrieveNotifications();

            $scope.markAsRead = function(notification){
                if(!notification.read){
                    notifications.markAsRead(notification.id).success(function(){
                        notification.read = true;
                    })
                }
            }
        }])
}());