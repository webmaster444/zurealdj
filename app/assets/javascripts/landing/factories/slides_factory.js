(function () {
    'use strict';
    angular.module('ZurealdjLandingApp').factory('SlidesFactory', ['AuthHttp', function($http){
        return {
            all: function(){
                return $http.get('/slides');
            }
        }
    }])
}());