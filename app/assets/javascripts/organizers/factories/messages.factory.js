(function () {
    'use strict';
    angular.module('ZurealdjOrganizerApp').factory('MessagesFactory', ['AuthHttp', function($http){
        return {
            all: function(options){

                var url = '/organizer/messages?';

                _.each(Object.keys(options), function(key){
                    if(options[key])
                        url = url + key + '=' + options[key] + '&';
                });

                return $http.get(url);
            },

            markAsRead: function(message_id){
                return $http.put('/organizer/messages/' + message_id, {
                    read: true
                })
            }
        }
    }])
}());