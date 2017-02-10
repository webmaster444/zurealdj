(function () {
    'use strict';
    angular.module('ZurealdjAdminApp').factory('SubscriptionsFactory', ['AuthHttp', function($http){
        return {

            upsert: function(subscription){
                if(!subscription)
                    subscription = {};

                if(subscription.id){
                    return $http.put('/admin/subscriptions/' + subscription.id, subscription, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }else{
                    return $http.post('/admin/subscriptions', subscription, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }
            },

            all: function(options){
                var url = '/admin/subscriptions.json?';

                _.each(Object.keys(options), function(key){
                    if(options[key])
                        url = url + key + '=' + options[key] + '&';
                });

                return $http.get(url);
            },

            show: function(id){
                return $http.get('/admin/djs/' + id + '.json');
            },

            destroy: function(id){
                return $http.delete('/admin/djs/' + id)
            },

            downloadCSV: function(options){
                var url = '/admin/djs.csv?';

                _.each(Object.keys(options.query), function(key){
                    if(options.query[key]){
                        url = url + key + '=' + options.query[key] + '&';
                    }
                });

                $http.download(url, options);
            }
        }
    }])
}());