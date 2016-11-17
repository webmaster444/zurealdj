(function () {
    'use strict';
    angular.module('ZurealdjLandingApp').factory('SessionsFactory', ['AuthHttp', function($http){
        return {
            check: function(){
                return $http.get('/sessions/check');
            },
            login: function(session){
                return $http.post('/sessions', {
                    email: session.email,
                    password: session.password
                })
            }
        }
    }])
}());