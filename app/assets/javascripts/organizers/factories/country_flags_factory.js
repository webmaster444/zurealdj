(function () {
    'use strict';
    angular.module('ZurealdjOrganizerApp').factory('CountryFlagsFactory', ['AuthHttp', function($http){
        return {
            all: function(){
                var request = '/country_flags.json';
                return $http.get(request);
            }
        }
    }])
}());