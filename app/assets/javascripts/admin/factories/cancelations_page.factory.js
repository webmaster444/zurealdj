(function () {
    'use strict';
    angular.module('ZurealdjAdminApp').factory('CancelationsPagesFactory', ['AuthHttp', function($http){
        return {

            upsert: function(cancelations_page){
                var fd = new FormData();

                if(cancelations_page.content){
                    fd.append('cancelations_page[content]', cancelations_page.content );
                }

                if(cancelations_page.id){
                    return $http.put('/admin/cancelations_pages/' + cancelations_page.id, fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }else{
                    return $http.post('/admin/cancelations_pages', fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }
            },

            all: function(options){
                return $http.get('/admin/cancelations_pages.json?page=' + options.page);
            },

            show: function(id){
                return $http.get('/admin/cancelations_pages/' + id + '.json');
            },

            destroy: function(id){
                return $http.delete('/admin/cancelations_pages/' + id)
            }
        }
    }])
}());