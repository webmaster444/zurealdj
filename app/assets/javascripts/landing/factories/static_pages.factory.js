(function () {
    'use strict';
    angular.module('ZurealdjLandingApp').factory('StaticPagesFactory', ['AuthHttp', function($http){
        return {
            get: function(page_name){
                return $http.get('/static_pages/' + page_name)
            }
        }
    }])
}());