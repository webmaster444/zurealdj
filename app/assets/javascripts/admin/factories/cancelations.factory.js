(function () {
    'use strict';
    angular.module('ZurealdjAdminApp').factory('CancelationsFactory', ['AuthHttp', function($http){
        return {

            upsert: function(cancelations){
                var fd = new FormData();

                if(cancelations.title){
                    fd.append('cancelation[title]', cancelations.title );
                }

                if(cancelations.id){
                    return $http.put('/admin/cancelations/' + cancelations.id, fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }else{
                    return $http.post('/admin/cancelations', fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }
            },

            all: function(options){
                var url = '/admin/cancelations.json?';
                if(options.page)
                    url = url + 'page=' + options.page + '&';

                _.each(Object.keys(options.query), function(key){
                    if(options.query[key])
                        url = url + key + '=' + options.query[key] + '&';
                });

                return $http.get(url);
            },

            show: function(id){
                return $http.get('/admin/cancelations/' + id + '.json');
            },

            destroy: function(id){
                return $http.delete('/admin/cancelations/' + id)
            },

            downloadCSV: function(options){
                var url = '/admin/cancelations.csv?';

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