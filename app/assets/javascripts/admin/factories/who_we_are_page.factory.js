(function () {
    'use strict';
    angular.module('ZurealdjAdminApp').factory('WhoWeArePagesFactory', ['AuthHttp', function($http){
        return {

            upsert: function(who_we_are_page){
                var fd = new FormData();

                if(who_we_are_page.content){
                    fd.append('who_we_are_page[content]', who_we_are_page.content );
                }

                if(who_we_are_page.language){
                    fd.append('who_we_are_page[language]', who_we_are_page.language );
                }

                return $http.put('/admin/who_we_are_pages/' + who_we_are_page.country_code, fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                });
            },

            all: function(options){
                return $http.get('/admin/who_we_are_pages.json?page=' + options.page);
            },

            show: function(id){
                return $http.get('/admin/who_we_are_pages/' + id + '.json');
            }
        }
    }])
}());