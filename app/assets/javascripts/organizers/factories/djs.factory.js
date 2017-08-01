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

            rate: function(rate){
                if(!rate) rate = {};

                var fd = new FormData();

                _.each(Object.keys(rate), function(key){
                    if(rate[key])
                        fd.append(key, rate[key]);
                });

                return $http.post('/organizer/djs/' + rate.dj_id + '/rate', fd)
            },

            addToFavorites: function(dj_id ){
                return $http.put('/organizer/favorite_djs/' + dj_id)
            },

            removeFromFavorites: function(dj_id){
                return $http.delete('/organizer/favorite_djs/' + dj_id)
            },

            comments: function(options, id){
                if(!options) options = {};

                var url = '/organizer/djs/comments.json?';

                _.each(Object.keys(options), function(key){
                    if(options[key])
                        url += key + '=' + options[key] + '&';
                });

                url += 'id=' + id + '&';

                return $http.get(url);
            }
        }
    }])
}());