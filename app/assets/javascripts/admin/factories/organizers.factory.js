(function () {
    'use strict';
    angular.module('ZurealdjAdminApp').factory('OrganizersFactory', ['AuthHttp', function($http){
        return {

            upsert: function(organizations){
                var fd = new FormData();

                fd.append('user[name]', organizations.name || '');
                fd.append('user[company_name]', organizations.company_name || '');
                fd.append('user[email]', organizations.email || '');
                fd.append('user[personal_url]', organizations.personal_url || '');
                fd.append('user[company_name]', organizations.company_name || '');
                fd.append('user[about]', organizations.about || '');
                fd.append('user[organizer_attributes][city]', organizations.city || '' );

                if(organizations.country){
                    fd.append('user[organizer_attributes][country_flag_code]', organizations.country.code );
                }
                if(organizations.avatar.file){
                    fd.append('user[avatar]', organizations.avatar.file);
                }

                _.each(organizations.event_types, function(i){
                    if(i.selected)
                        fd.append('user[event_category_ids][]', i.id)
                });
                _.each(organizations.genres, function(i){
                    if(i.selected)
                        fd.append('user[genre_ids][]', i.id)
                });

                if(fd.get('user[event_category_ids][]')==null)
                    fd.append('user[event_category_ids][]', '');
                if(fd.get('user[genre_ids][]')==null)
                    fd.append('user[genre_ids][]', '');

                if(organizations.id){
                    return $http.put('/admin/organizers/' + organizations.id, fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }else{
                    return $http.post('/admin/organizers', fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }
            },

            all: function(options){
                var url = '/admin/organizers.json?';

                _.each(Object.keys(options), function(key){
                    if(options[key])
                        url = url + key + '=' + options[key] + '&';
                });

                return $http.get(url);
            },

            show: function(id){
                return $http.get('/admin/organizers/' + id + '.json');
            },

            destroy: function(id){
                return $http.delete('/admin/organizers/' + id)
            },

            downloadCSV: function(options){
                var url = '/admin/organizers.csv?';

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