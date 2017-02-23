(function () {
    'use strict';
    angular.module('ZurealdjLandingApp').factory('TopRatedDjsFactory', ['AuthHttp', function($http){
        return {
            all: function(){
                return $http.get('/top_rated_djs');
            }
        }
    }])
}());