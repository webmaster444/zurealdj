(function () {
    'use strict';
    angular.module('ZurealdjLandingApp').factory('SubscriptionsFactory', ['$http', function($http){
        return {
            all: function(){
                return $http.get('/subscriptions');
            }
        }
    }])
}());