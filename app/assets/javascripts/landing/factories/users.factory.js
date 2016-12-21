(function () {
    'use strict';
    angular.module('ZurealdjLandingApp').factory('UsersFactory', ['$http', function($http){
        return {
            create: function(user){
                return $http.post('/users', user)
            }
        }
    }])
}());