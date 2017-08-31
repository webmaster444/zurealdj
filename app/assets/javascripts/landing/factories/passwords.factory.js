(function () {
    'use strict';
    angular.module('ZurealdjLandingApp').factory('PasswordsFactory', ['AuthHttp', '$location', function($http, $location){
        return {
            forgot: function(email){
                return $http.post('/password_resets?email=' + email);
            },
            reset: function(password, password_confirmation, token){
                return $http.put('/password_resets/' + token + '?password=' + password + '&password_confirmation=' + password_confirmation);
            }
        }
    }])
}());
