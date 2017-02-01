(function () {
    'use strict';
    angular.module('ZurealdjDjApp').factory('ChatRoomsFactory', ['AuthHttp', function($http){
        return {

            all: function(options){
                if(!options)
                    options = {};

                var url = '/dj/chat_rooms.json?';

                _.each(Object.keys(options), function(key){
                    if(options[key])
                        url += key + '=' + options[key] + '&';
                });

                return $http.get(url);
            }
        }
    }])
}());