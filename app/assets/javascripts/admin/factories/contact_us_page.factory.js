(function () {
    'use strict';
    angular.module('ZurealdjAdminApp').factory('ContactUsPagesFactory', ['AuthHttp', function($http){
        return {

            upsert: function(page){
                var fd = new FormData();

                if(page.content){
                    fd.append('contact_us_page[content]', page.content );
                }

                return $http.put('/admin/contact_us_pages', fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                });
            },

            show: function(id){
                return $http.get('/admin/contact_us_pages');
            }
        }
    }])
}());