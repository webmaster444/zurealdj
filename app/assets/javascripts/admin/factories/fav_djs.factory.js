(function () {
    'use strict';
    angular.module('ZurealdjAdminApp').factory('FavDjsFactory', ['AuthHttp', function($http){
        return {

            upsert: function(fav_dj){
                var fd = new FormData();


                if(fav_dj.image.file){
                    fd.append('fav_dj[image]', fav_dj.image.file );
                }
                if(fav_dj.dj_id){
                    fd.append('fav_dj[dj_id]', fav_dj.dj_id );
                }
                if(fav_dj.detail){
                    fd.append('fav_dj[detail]', fav_dj.detail );
                }

                if(fav_dj.id){
                    return $http.put('/admin/fav_djs/' + fav_dj.id, fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }else{
                    return $http.post('/admin/fav_djs', fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }
            },

            all: function(options){
                var url = '/admin/fav_djs.json?';
                if(options.page)
                    url = url + 'page=' + options.page + '&';

                _.each(Object.keys(options.query), function(key){
                    if(options.query[key])
                        url = url + key + '=' + options.query[key] + '&';
                });

                return $http.get(url);
            },

            show: function(id){
                return $http.get('/admin/fav_djs/' + id + '.json');
            },

            destroy: function(id){
                return $http.delete('/admin/fav_djs/' + id)
            },

            downloadCSV: function(options){
                var url = '/admin/fav_djs.csv?';

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