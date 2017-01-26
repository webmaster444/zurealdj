(function () {
    'use strict';
    angular.module('ZurealdjAdminApp').factory('CancellationPolicyFactory', ['AuthHttp', function($http){
        return {

            upsert: function(cancellation_policy){
                var fd = new FormData();

                if(cancellation_policy.content){
                    fd.append('cancellation_policy[content]', cancellation_policy.content );
                }

                return $http.put('/admin/cancellation_policy', fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                });
            },

            show: function(id){
                return $http.get('/admin/cancellation_policy');
            }
        }
    }])
}());