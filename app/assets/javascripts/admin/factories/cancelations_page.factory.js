(function () {
    'use strict';
    angular.module('ZurealdjAdminApp').factory('CancelationsPagesFactory', ['AuthHttp', function($http){
        return {

            upsert: function(cancelations_page){
                var fd = new FormData();

                if(cancelations_page.content){
                    fd.append('cancelations_page[content]', cancelations_page.content );
                }

                return $http.put('/admin/cancelations_pages/1', fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                });
            },

            show: function(id){
                return $http.get('/admin/cancelations_pages/1.json');
            }
        }
    }])
}());