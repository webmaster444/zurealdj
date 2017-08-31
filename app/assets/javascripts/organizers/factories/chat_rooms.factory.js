(function () {
    'use strict';
    angular.module('ZurealdjOrganizerApp').factory('ChatRoomsFactory', ['AuthHttp', function($http){
        return {

            all: function(options){
                var url = '/organizer/chat_rooms.json?';

                _.each(Object.keys(options), function(key){
                    if(options[key])
                        url += key + '=' + options[key] + '&';
                });

                return $http.get(url);
            }
        }
    }])
}());