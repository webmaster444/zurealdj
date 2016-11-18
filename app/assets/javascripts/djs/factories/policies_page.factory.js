(function () {
    'use strict';
    angular.module('ZurealdjApp').factory('PoliciesPagesFactory', ['AuthHttp', function($http){
        return {

            upsert: function(policies_page){
                var fd = new FormData();

                if(policies_page.content){
                    fd.append('policies_page[content]', policies_page.content );
                }

                if(policies_page.id){
                    return $http.put('/policies_pages/' + policies_page.id, fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }else{
                    return $http.post('/policies_pages', fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }
            },

            all: function(options){
                return $http.get('/policies_pages.json?page=' + options.page);
            },

            show: function(id){
                return $http.get('/policies_pages/' + id + '.json');
            },

            destroy: function(id){
                return $http.delete('/policies_pages/' + id)
            }
        }
    }])
}());