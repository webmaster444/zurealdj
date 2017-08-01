(function () {
    'use strict';
    angular.module('ZurealdjOrganizerApp').factory('NotificationsFactory', ['AuthHttp', function($http){
        return {
            all: function(options = {}){

                var url = '/notifications.json?';

                _.each(Object.keys(options), function(key){
                    if(options[key])
                        url = url + key + '=' + options[key] + '&';
                });

                return $http.get(url);
            },

            markAsRead: function(notification_id){
                return $http.put('/notifications/' + notification_id, {
                    read: true
                })
            }
        }
    }])
}());