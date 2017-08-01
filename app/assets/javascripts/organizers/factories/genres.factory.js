(function () {
    'use strict';
    angular.module('ZurealdjOrganizerApp').factory('GenresFactory', ['AuthHttp', function($http){
        return {
            all: function(){
                return $http.get('/organizer/genres.json');
            }
        }
    }])
}());