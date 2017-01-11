(function () {
    'use strict';
    angular.module('ZurealdjLandingApp').factory('StaticPagesFactory', ['$http', function($http){
        return {
            terms_n_conditions: function(){
                return $http.get('/static_pages/terms_n_conditions')
            },
            crew: function(){
                return $http.get('/static_pages/crew')
            },
            how_we_work: function(){
                return $http.get('/static_pages/how_we_work')
            },
            who_we_are: function(){
                return $http.get('/static_pages/who_we_are')
            },
            cancelations: function(){
                return $http.get('/static_pages/cancelations')
            },
            policies: function(){
                return $http.get('/static_pages/policies')
            }
        }
    }])
}());