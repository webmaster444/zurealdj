(function () {
    'use strict';
    angular.module('ZurealdjAdminApp').factory('GenresFactory', ['AuthHttp', function($http){
        return {

            upsert: function(genres){
                var fd = new FormData();

                if(genres.title){
                    fd.append('genre[title]', genres.title );
                }

                if(genres.id){
                    return $http.put('/admin/genres/' + genres.id, fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }else{
                    return $http.post('/admin/genres', fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }
            },

            all: function(options){
                var url = '/admin/genres.json?';
                if(options.page)
                    url = url + 'page=' + options.page + '&';

                _.each(Object.keys(options.query), function(key){
                    if(options.query[key])
                        url = url + key + '=' + options.query[key] + '&';
                });

                return $http.get(url);
            },

            show: function(id){
                return $http.get('/admin/genres/' + id + '.json');
            },

            destroy: function(id){
                return $http.delete('/admin/genres/' + id)
            },

            downloadCSV: function(options){
                var url = '/admin/genres.csv?';

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