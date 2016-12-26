(function () {
    'use strict';
    angular.module('ZurealdjOrganizerApp').factory('DjsFactory', ['AuthHttp', function($http){
        return {
            all: function(options){
                var url = '/organizer/djs.json?';

                _.each(Object.keys(options), function(key){
                    if(options[key]) {
                        url = url + key + '=' + options[key] + '&';
                    }
                });

                return $http.get(url);
            },

            show: function(id){
                return $http.get('/organizer/djs/' + id + '.json');
            },

            rate: function(dj_id, rating){
                return $http.post('/organizer/djs/' + dj_id + '/rate', {
                    rating: rating
                })
            },

            addToFavorites: function(dj_id ){
                return $http.put('/organizer/favorite_djs/' + dj_id)
            },

            removeFromFavorites: function(dj_id){
                return $http.delete('/organizer/favorite_djs/' + dj_id)
            }
        }
    }])
}());