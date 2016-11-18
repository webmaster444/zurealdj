(function () {
    'use strict';
    angular.module('ZurealdjAdminApp').factory('CountryFlagsFactory', ['$http', function($http){
        return {
            all: function(){
                var request = '/country_flags.json';
                return $http.get(request);
            }
        }
    }])
}());