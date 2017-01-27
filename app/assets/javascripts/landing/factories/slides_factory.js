(function () {
    'use strict';
    angular.module('ZurealdjLandingApp').factory('SlidesFactory', ['$http', function($http){
        return {
            all: function(){
                return $http.get('/slides');
            }
        }
    }])
}());