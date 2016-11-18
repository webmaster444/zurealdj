(function () {
    'use strict';
    angular.module('ZurealdjApp').factory('HowWeWorkPagesFactory', ['AuthHttp', function($http){
        return {

            upsert: function(how_we_work_page){
                var fd = new FormData();

                if(how_we_work_page.content){
                    fd.append('how_we_work_page[content]', how_we_work_page.content );
                }

                if(how_we_work_page.id){
                    return $http.put('/how_we_work_pages/' + how_we_work_page.id, fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }else{
                    return $http.post('/how_we_work_pages', fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }
            },

            all: function(options){
                return $http.get('/how_we_work_pages.json?page=' + options.page);
            },

            show: function(id){
                return $http.get('/how_we_work_pages/' + id + '.json');
            },

            destroy: function(id){
                return $http.delete('/how_we_work_pages/' + id)
            }
        }
    }])
}());