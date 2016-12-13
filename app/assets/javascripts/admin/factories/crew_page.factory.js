(function () {
    'use strict';
    angular.module('ZurealdjAdminApp').factory('CrewPagesFactory', ['AuthHttp', function($http){
        return {

            upsert: function(crew_page){
                var fd = new FormData();

                fd.append('crew_page[content]', crew_page.content || '');
                fd.append('crew_page[language]', crew_page.language || '');

                return $http.put('/admin/crew_pages/' + crew_page.country_code, fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                });
            },

            all: function(options){
                return $http.get('/admin/crew_pages.json?page=' + options.page);
            },

            show: function(id){
                return $http.get('/admin/crew_pages/' + id + '.json');
            }
        }
    }])
}());