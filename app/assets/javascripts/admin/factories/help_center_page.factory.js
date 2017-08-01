(function () {
    'use strict';
    angular.module('ZurealdjAdminApp').factory('HelpCenterPagesFactory', ['AuthHttp', function($http){
        return {

            upsert: function(page){
                var fd = new FormData();

                if(page.content){
                    fd.append('help_center_page[content]', page.content );
                }

                return $http.put('/admin/help_center_pages', fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                });
            },

            show: function(id){
                return $http.get('/admin/help_center_pages');
            }
        }
    }])
}());