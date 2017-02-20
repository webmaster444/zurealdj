(function () {
    'use strict';
    angular.module('ZurealdjAdminApp').factory('BookingsFactory', ['AuthHttp', function($http){
        return {

            all: function(options, page){
                var url = '/admin/bookings.json?';

                if(page){
                    url += 'page' + '=' + page + '&';
                }

                _.each(Object.keys(options, page), function(key){
                    if(options[key])
                        url += key + '=' + options[key] + '&';
                });

                return $http.get(url);
            },

            downloadCSV: function(options){
                var url = '/admin/bookings.csv?';

                _.each(Object.keys(options.query), function(key){
                    if(options.query[key]){
                        url += key + '=' + options.query[key] + '&';
                    }
                });

                $http.download(url, options);
            },

            destroy: function(id){
                return $http.delete('/admin/bookings/' + id)
            }
        }
    }])
}());