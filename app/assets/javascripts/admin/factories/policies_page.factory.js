(function () {
    'use strict';
    angular.module('ZurealdjAdminApp').factory('PoliciesPagesFactory', ['AuthHttp', function($http){
        return {

            upsert: function(policies_page){
                var fd = new FormData();

                fd.append('policies_page[content]', policies_page.content || '');
                fd.append('policies_page[language]', policies_page.language || '');

                return $http.put('/admin/policies_pages/' + policies_page.country_code, fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                });
            },

            all: function(options){
                return $http.get('/admin/policies_pages.json?page=' + options.page);
            },

            show: function(id){
                return $http.get('/admin/policies_pages/' + id + '.json');
            },

            destroy: function(id){
                return $http.delete('/admin/policies_pages/' + id)
            }
        }
    }])
}());