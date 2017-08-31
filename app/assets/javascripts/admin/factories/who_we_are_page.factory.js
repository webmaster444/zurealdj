(function () {
    'use strict';
    angular.module('ZurealdjAdminApp').factory('WhoWeArePagesFactory', ['AuthHttp', function($http){
        return {

            upsert: function(who_we_are_page){
                var fd = new FormData();

                if(who_we_are_page.content){
                    fd.append('who_we_are_page[content]', who_we_are_page.content );
                }

                return $http.put('/admin/who_we_are_pages/1', fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                });
            },

            show: function(id){
                return $http.get('/admin/who_we_are_pages/1.json');
            }
        }
    }])
}());