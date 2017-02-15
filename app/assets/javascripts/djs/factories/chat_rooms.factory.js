(function () {
    'use strict';
    angular.module('ZurealdjDjApp').factory('ChatRoomsFactory', ['AuthHttp', function($http){
        return {

            all: function(q){
                var url = '/dj/chat_rooms?q=' + q;

                return $http.get(url);
            }
        }
    }])
}());