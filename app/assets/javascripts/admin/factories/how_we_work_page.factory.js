(function () {
    'use strict';
    angular.module('ZurealdjAdminApp').factory('HowWeWorkPagesFactory', ['AuthHttp', function($http){
        return {

            upsert: function(how_we_work_page){
                var fd = new FormData();

                if(how_we_work_page.content){
                    fd.append('how_we_work_page[content]', how_we_work_page.content );
                }

                if(how_we_work_page.language){
                    fd.append('how_we_work_page[language]', how_we_work_page.language );
                }

                return $http.put('/admin/how_we_work_pages/' + how_we_work_page.country_code, fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                });
            },

            all: function(options){
                return $http.get('/admin/how_we_work_pages.json?page=' + options.page);
            },

            show: function(id){
                return $http.get('/admin/how_we_work_pages/' + id + '.json');
            }
        }
    }])
}());