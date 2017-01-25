(function () {
    'use strict';
    angular.module('ZurealdjDjApp').factory('EventsFactory', ['AuthHttp', function($http){
        return {

            all: function(options){

                var url = '/dj/events.json?';

                _.each(Object.keys(options), function(key){
                    if(options[key])
                        url += key + '=' + options[key] + '&';
                });

                return $http.get(url);
            },

            show: function(id){
                return $http.get('/dj/events/' + id + '.json');
            }
        }
    }])
}());