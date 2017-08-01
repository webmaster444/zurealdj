(function () {
    'use strict';
    angular.module('ZurealdjAdminApp').factory('PoliciesPagesFactory', ['AuthHttp', function($http){
        return {

            upsert: function(policies_page){
                var fd = new FormData();

                fd.append('policies_page[content]', policies_page.content || '');

                return $http.put('/admin/policies_pages/1', fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                });
            },

            show: function(id){
                return $http.get('/admin/policies_pages/1.json');
            }
        }
    }])
}());