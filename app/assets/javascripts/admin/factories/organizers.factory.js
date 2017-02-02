(function () {
    'use strict';
    angular.module('ZurealdjAdminApp').factory('OrganizersFactory', ['AuthHttp', function($http){
        return {

            upsert: function(organizations){
                var fd = new FormData();

                if(organizations.name){
                    fd.append('organizer[name]', organizations.name );
                }
                if(organizations.email){
                    fd.append('organizer[email]', organizations.email );
                }
                if(organizations.personal_url){
                    fd.append('organizer[personal_url]', organizations.personal_url );
                }
                if(organizations.country){
                    fd.append('organizer[country_flag_code]', organizations.country.code );
                }
                if(organizations.avatar.file){
                    fd.append('organizer[avatar]', organizations.avatar.file);
                }
                fd.append('organizer[first_name]', organizations.first_name || '');
                fd.append('organizer[last_name]', organizations.last_name || '');
                fd.append('organizer[city]', organizations.city || '' );
                fd.append('organizer[about]', organizations.about || '');

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
                if(options.page)
                    url = url + 'page=' + options.page + '&';

                _.each(Object.keys(options.query), function(key){
                    if(options.query[key])
                        url = url + key + '=' + options.query[key] + '&';
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