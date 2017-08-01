(function () {
    'use strict';
    angular.module('ZurealdjDjApp').factory('GenresFactory', ['AuthHttp', function($http){
        return {
            all: function(){
                return $http.get('/dj/genres');
            }
        }
    }])
}());