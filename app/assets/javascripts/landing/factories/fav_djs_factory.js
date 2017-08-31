(function () {
    'use strict';
    angular.module('ZurealdjLandingApp').factory('FavDjsFactory', ['AuthHttp', function($http){
        return {
            all: function(){
                return $http.get('/fav_djs');
            }
        }
    }])
}());