(function () {
    'use strict';
    angular.module('ZurealdjAdminApp').factory('CrewPagesFactory', ['AuthHttp', function($http){
        return {

            upsert: function(crew_page){
                var fd = new FormData();

                fd.append('crew_page[content]', crew_page.content || '');

                return $http.put('/admin/crew_pages/1', fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                });
            },

            show: function(id){
                return $http.get('/admin/crew_pages/1.json');
            }
        }
    }])
}());