(function () {
    'use strict';
    angular.module('ZurealdjAdminApp').factory('OrganizersFactory', ['AuthHttp', function($http){
        return {

            upsert: function(organizations){
                var fd = new FormData();

                fd.append('organizer[first_name]', organizations.first_name || '');
                fd.append('organizer[last_name]', organizations.last_name || '');
                fd.append('organizer[city]', organizations.city || '' );
                fd.append('organizer[country_flag_code]', organizations.country_flag_code || '');
                fd.append('organizer[address]', organizations.address || '');
                fd.append('organizer[about]', organizations.about || '');
                fd.append('organizer[instagram_link]', organizations.instagram_link || '');
                fd.append('organizer[facebook_link]', organizations.facebook_link || '');
                fd.append('organizer[soundcloud_link]', organizations.soundcloud_link || '');

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
                return $http.get('/admin/organizers.json?page=' + options.page);
            },

            show: function(id){
                return $http.get('/admin/organizers/' + id + '.json');
            },

            destroy: function(id){
                return $http.delete('/admin/organizers/' + id)
            }
        }
    }])
}());