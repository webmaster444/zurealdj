(function () {
    'use strict';
    angular.module('ZurealdjLandingApp').factory('StaticPagesFactory', ['$http', function($http){
        return {
            terms_n_conditions: function(){
                return $http.get('/static_pages/terms_n_conditions')
            },
            how_we_work: function(){
                return $http.get('/static_pages/how_we_work')
            },
        }
    }])
}());