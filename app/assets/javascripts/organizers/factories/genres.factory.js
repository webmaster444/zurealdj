(function () {
    'use strict';
    angular.module('ZurealdjOrganizerApp').factory('GenresFactory', ['AuthHttp', function($http){
        return {

            upsert: function(genres){
                var fd = new FormData();

                if(genres.title){
                    fd.append('genre[title]', genres.title );
                }

                if(genres.id){
                    return $http.put('/genres/' + genres.id, fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }else{
                    return $http.post('/genres', fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }
            },

            all: function(options){
                return $http.get('/genres.json?page=' + options.page);
            },

            show: function(id){
                return $http.get('/genres/' + id + '.json');
            },

            destroy: function(id){
                return $http.delete('/genres/' + id)
            }
        }
    }])
}());