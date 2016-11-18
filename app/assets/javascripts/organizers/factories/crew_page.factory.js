(function () {
    'use strict';
    angular.module('ZurealdjApp').factory('CrewPagesFactory', ['AuthHttp', function($http){
        return {

            upsert: function(crew_page){
                var fd = new FormData();

                if(crew_page.content){
                    fd.append('crew_page[content]', crew_page.content );
                }

                if(crew_page.id){
                    return $http.put('/crew_pages/' + crew_page.id, fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }else{
                    return $http.post('/crew_pages', fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }
            },

            all: function(options){
                return $http.get('/crew_pages.json?page=' + options.page);
            },

            show: function(id){
                return $http.get('/crew_pages/' + id + '.json');
            },

            destroy: function(id){
                return $http.delete('/crew_pages/' + id)
            }
        }
    }])
}());