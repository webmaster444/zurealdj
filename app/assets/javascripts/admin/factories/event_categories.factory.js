(function () {
    'use strict';
    angular.module('ZurealdjAdminApp').factory('EventCategoriesFactory', ['AuthHttp', function($http){
        return {

            upsert: function(event_categories){
                var fd = new FormData();

                if(event_categories.title){
                    fd.append('event_category[title]', event_categories.title );
                }

                if(event_categories.id){
                    return $http.put('/admin/event_categories/' + event_categories.id, fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }else{
                    return $http.post('/admin/event_categories', fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }
            },

            all: function(options){
                var url = '/admin/event_categories.json?';
                if(options.page)
                    url = url + 'page=' + options.page + '&';

                _.each(Object.keys(options.query), function(key){
                    if(options.query[key])
                        url = url + key + '=' + options.query[key] + '&';
                });

                return $http.get(url);
            },

            show: function(id){
                return $http.get('/admin/event_categories/' + id + '.json');
            },

            destroy: function(id){
                return $http.delete('/admin/event_categories/' + id)
            },

            downloadCSV: function(options){
                var url = '/admin/event_categories.csv?';

                _.each(Object.keys(options.query), function(key){
                    if(options.query[key]){
                        url = url + key + '=' + options.query[key] + '&';
                    }
                });

                $http.download(url, options);
            }
        }
    }])
}());