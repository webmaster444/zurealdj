(function () {
    'use strict';
    angular.module('ZurealdjLandingApp').factory('UsersFactory', ['AuthHttp', function($http){
        return {
            create: function(user){
                return $http.post('/users', user)
            },
            facebook: function(user, access_token){
                user.access_token = access_token;
                return $http.post('/users/facebook', user)
            }
        }
    }])
}());