(function () {
    'use strict';
    angular.module('ZurealdjOrganizerApp').factory('DjsFactory', ['AuthHttp', function($http){
        return {
            all: function(options){

                var url = '/organizer/djs.json?';

                _.each(Object.keys(options), function(key){
                    if(options[key]) {
                        switch(key) {
                            case 'event_types':
                                _.each(options.event_types, function(i){
                                    if(i.checked)
                                        url = url + 'event_types[]=' + i.id + '&';
                                });
                                break;
                            case 'genres':
                                _.each(options.genres, function(i){
                                    if(i.checked)
                                        url = url + 'genres[]=' + i.id + '&';
                                });
                                break;
                            default:
                                url = url + key + '=' + options[key] + '&';
                                break
                        }


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