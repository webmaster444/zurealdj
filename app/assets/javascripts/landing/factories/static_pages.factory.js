(function () {
    'use strict';
    angular.module('ZurealdjLandingApp').factory('StaticPagesFactory', ['$http', function($http){
        return {
            get: function(page_name){
                return $http.get('/static_pages/' + page_name)
            }
        }
    }])
}());