(function () {
    'use strict';
    angular.module('ZurealdjAdminApp').factory('WhoWeArePagesFactory', ['AuthHttp', function($http){
        return {

            upsert: function(who_we_are_page){
                var fd = new FormData();

                if(who_we_are_page.content){
                    fd.append('who_we_are_page[content]', who_we_are_page.content );
                }

                if(who_we_are_page.id){
                    return $http.put('/admin/who_we_are_pages/' + who_we_are_page.id, fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }else{
                    return $http.post('/admin/who_we_are_pages', fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }
            },

            all: function(options){
                return $http.get('/admin/who_we_are_pages.json?page=' + options.page);
            },

            show: function(id){
                return $http.get('/admin/who_we_are_pages/' + id + '.json');
            },

            destroy: function(id){
                return $http.delete('/admin/who_we_are_pages/' + id)
            }
        }
    }])
}());