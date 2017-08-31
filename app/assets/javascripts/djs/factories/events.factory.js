(function () {
    'use strict';
    angular.module('ZurealdjDjApp').factory('EventsFactory', ['AuthHttp', function($http){
        return {

            all: function(options){
                if(!options)
                    options = {}

                var url = '/dj/events.json?';

                _.each(Object.keys(options), function(key){
                    if(options[key])
                        url += key + '=' + options[key] + '&';
                });

                return $http.get(url);
            },

            filter: function(options){

                var url = '/dj/events.json?';

                _.each(Object.keys(options), function(key){
                    if(options[key]){

                        if (key == "genres"){

                            options[key].forEach(function(genre) {
                                if(genre.checked){
                                    url += 'gid[]=' + genre.id + '&';
                                }
                            });

                        } else if (key == "event_types"){

                            options[key].forEach(function(types) {
                                if(types.checked){
                                    url += 'tid[]=' + types.id + '&';
                                }
                            });

                        } else {
                            url += key + '=' + options[key] + '&';
                        }
                    }

                });

                return $http.get(url);
            },

            show: function(id){
                return $http.get('/dj/events/' + id + '.json');
            }
        }
    }])
}());