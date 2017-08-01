(function () {
    'use strict';
    angular.module('ZurealdjOrganizerApp').factory('SubscriptionsFactory', ['AuthHttp', function($http){
        return {
            all: function(){
                return $http.get('/organizer/subscriptions');
            },
            get: function(options){
                return $http.post('/organizer/subscriptions', options);
            }
        }
    }])
}());