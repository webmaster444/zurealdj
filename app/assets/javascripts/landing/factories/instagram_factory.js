(function () {
    'use strict';
    angular.module('ZurealdjLandingApp').factory('InstagramFactory', ['AuthHttp', function($http){
        return {
            all: function(){
                return $http.get('/instagram');
            }
        }
    }])
}());