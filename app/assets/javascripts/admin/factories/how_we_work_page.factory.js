(function () {
    'use strict';
    angular.module('ZurealdjAdminApp').factory('HowWeWorkPagesFactory', ['AuthHttp', function($http){
        return {

            upsert: function(how_we_work_page){
                var fd = new FormData();

                if(how_we_work_page.content){
                    fd.append('how_we_work_page[content]', how_we_work_page.content );
                }

                return $http.put('/admin/how_we_work_pages/1', fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                });
            },

            show: function(id){
                return $http.get('/admin/how_we_work_pages/1.json');
            }
        }
    }])
}());