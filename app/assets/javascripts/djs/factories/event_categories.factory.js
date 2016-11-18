(function () {
    'use strict';
    angular.module('ZurealdjApp').factory('EventCategoriesFactory', ['AuthHttp', function($http){
        return {

            upsert: function(event_categories){
                var fd = new FormData();

                if(event_categories.title){
                    fd.append('event_category[title]', event_categories.title );
                }

                if(event_categories.id){
                    return $http.put('/event_categories/' + event_categories.id, fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }else{
                    return $http.post('/event_categories', fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }
            },

            all: function(options){
                return $http.get('/event_categories.json?page=' + options.page);
            },

            show: function(id){
                return $http.get('/event_categories/' + id + '.json');
            },

            destroy: function(id){
                return $http.delete('/event_categories/' + id)
            }
        }
    }])
}());