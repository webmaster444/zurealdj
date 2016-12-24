(function () {
    'use strict';
    angular.module('ZurealdjOrganizerApp').factory('SessionsFactory', ['AuthHttp', function($http){
        return {
            check: function(){
                return $http.get('/organizer/sessions/check');
            },
            logout: function(){
                return $http.delete('/organizer/sessions')
            }
        }
    }])
}());