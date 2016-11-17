(function () {
    'use strict';
    angular.module('ZurealdjApp').factory('OrganizationsFactory', ['AuthHttp', function($http){
        return {

            upsert: function(organizations){
                var fd = new FormData();

                if(organizations.first_name){
                    fd.append('organizations[first_name]', organizations.first_name );
                }
                if(organizations.last_name){
                    fd.append('organizations[last_name]', organizations.last_name );
                }
                if(organizations.city){
                    fd.append('organizations[city]', organizations.city );
                }
                if(organizations.country){
                    fd.append('organizations[country_flag_code]', organizations.country.code );
                }
                if(organizations.address){
                    fd.append('organizations[address]', organizations.address );
                }
                if(organizations.about){
                    fd.append('organizations[about]', organizations.about );
                }
                if(organizations.instagram_link){
                    fd.append('organizations[instagram_link]', organizations.instagram_link );
                }
                if(organizations.facebook_link){
                    fd.append('organizations[facebook_link]', organizations.facebook_link );
                }
                if(organizations.soundcloud_link){
                    fd.append('organizations[soundcloud_link]', organizations.soundcloud_link );
                }

                if(organizations.id){
                    return $http.put('/organizations/' + organizations.id, fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }else{
                    return $http.post('/organizations', fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }
            },

            all: function(options){
                return $http.get('/organizations.json?page=' + options.page);
            },

            show: function(id){
                return $http.get('/organizations/' + id + '.json');
            },

            destroy: function(id){
                return $http.delete('/organizations/' + id)
            }
        }
    }])
}());