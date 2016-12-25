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
            }
        }
    }])
}());