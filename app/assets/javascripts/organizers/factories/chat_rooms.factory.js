(function () {
    'use strict';
    angular.module('ZurealdjOrganizerApp').factory('ChatRoomsFactory', ['AuthHttp', function($http){
        return {

            all: function(options){
                var url = '/organizer/chat_rooms.json?q=' + options;
                return $http.get(url);
            }
        }
    }])
}());