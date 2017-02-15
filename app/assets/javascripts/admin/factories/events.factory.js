(function () {
    'use strict';
    angular.module('ZurealdjAdminApp').factory('EventsFactory', ['AuthHttp', function($http){
        return {

            all: function(options){
                var url = '/admin/events.json?';

                _.each(Object.keys(options), function(key){
                    if(options[key])
                        url = url + key + '=' + options[key] + '&';
                });

                return $http.get(url);
            },

            show: function(id){
                return $http.get('/admin/events/' + id + '.json');
            },

            destroy: function(id){
                return $http.delete('/admin/events/' + id)
            },

            downloadCSV: function(options){
                var url = '/admin/events.csv?';

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