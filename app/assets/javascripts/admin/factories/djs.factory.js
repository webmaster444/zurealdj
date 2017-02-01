(function () {
    'use strict';
    angular.module('ZurealdjAdminApp').factory('DjsFactory', ['AuthHttp', function($http){
        return {

            upsert: function(djs){
                var fd = new FormData();

                fd.append('user[name]', djs.name || '' );
                fd.append('user[email]', djs.email || '');
                fd.append('user[personal_url]', djs.personal_url || '');
                fd.append('user[dj_attributes][city]', djs.city || '');
                if(djs.country){
                    fd.append('user[dj_attributes][country_flag_code]', djs.country.code );
                }
                fd.append('user[dj_attributes][about]', djs.about || '');

                // if(djs.sample && djs.sample.url ){
                //     fd.append('user[dj_attributes][sample]', djs.sample);
                // }
                // else{
                //     fd.append('user[dj_attributes][sample][url]', djs.sample_url);
                // }

                fd.append('user[dj_attributes][rate_per_hour]', djs.rate_per_hour || '');

                if(djs.avatar.file){
                    fd.append('user[avatar]', djs.avatar.file);
                }
                if(djs.id){
                    return $http.put('/admin/djs/' + djs.id, fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }else{
                    return $http.post('/admin/djs', fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }
            },

            all: function(options){
                var url = '/admin/djs.json?';
                if(options.page)
                    url = url + 'page=' + options.page + '&';

                _.each(Object.keys(options.query), function(key){
                    if(options.query[key])
                        url = url + key + '=' + options.query[key] + '&';
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