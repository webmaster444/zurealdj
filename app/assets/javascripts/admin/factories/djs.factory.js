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
                fd.append('user[about]', djs.about || '');

                // if(djs.sample && djs.sample.url ){
                //     fd.append('user[dj_attributes][sample]', djs.sample);
                // }
                // else{
                //     fd.append('user[dj_attributes][sample][url]', djs.sample_url);
                // }

                fd.append('user[dj_attributes][rate_per_hour]', djs.rate_per_hour || 0);
                fd.append('user[dj_attributes][free_to_hire]', djs.free_to_hire || false);

                _.each(djs.event_types, function(i){
                    if(i.selected)
                        fd.append('user[event_category_ids][]', i.id)
                });
                _.each(djs.genres, function(i){
                    if(i.selected)
                        fd.append('user[genre_ids][]', i.id)
                });
                _.each(djs.equipments, function(i){
                    if(i.selected)
                        fd.append('user[equipment_ids][]', i.id)
                });

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