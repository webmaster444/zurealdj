(function () {
    'use strict';
    angular.module('ZurealdjAdminApp').factory('PasswordsFactory', ['AuthHttp', '$location', function($http, $location){
        return {
            forgot: function(email){
                return $http.post('/admin/password_resets?email=' + email);
            },
            reset: function(password, password_confirmation){
                return $http.put('/admin/password_resets/' + window.location.pathname.split('/')[3] + '?password=' + password + '&password_confirmation=' + password_confirmation);
            }
        }
    }])
}());
