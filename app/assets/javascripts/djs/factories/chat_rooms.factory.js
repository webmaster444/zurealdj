(function () {
    'use strict';
    angular.module('ZurealdjDjApp').factory('ChatRoomsFactory', ['AuthHttp', function($http){
        return {

            all: function(options){
                var url = '/dj/chat_rooms?';

                _.each(Object.keys(options), function(key){
                    if(options[key])
                        url += key + '=' + options[key] + '&';
                });

                return $http.get(url);
            }
        }
    }])
}());