(function () {
    'use strict';
    angular.module('ZurealdjDjApp').factory('SessionsFactory', ['AuthHttp', function($http){
        return {
            check: function(){
                return $http.get('/dj/sessions/check');
            },
            logout: function(){
                return $http.delete('/sessions')
            }
        }
    }])
}());