(function () {
    'use strict';
    angular.module('ZurealdjDjApp').factory('SubscriptionsFactory', ['AuthHttp', function($http){
        return {
            all: function(){
                return $http.get('/dj/subscriptions');
            },
            get: function(options){
                return $http.post('/dj/subscriptions', options);
            }
        }
    }])
}());