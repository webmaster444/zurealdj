(function () {
    'use strict';
    angular.module('ZurealdjLandingApp').factory('SubscriptionsFactory', ['AuthHttp', function($http){
        return {
            all: function(){
                return $http.get('/subscriptions');
            }
        }
    }])
}());