(function () {
    'use strict';
    angular.module('ZurealdjDjApp').factory('NotificationsFactory', ['AuthHttp', function($http){
        return {
            all: function(options = {}){

                var url = '/dj/notifications.json?';

                _.each(Object.keys(options), function(key){
                    if(options[key])
                        url = url + key + '=' + options[key] + '&';
                });

                return $http.get(url);
            }
        }
    }])
}());