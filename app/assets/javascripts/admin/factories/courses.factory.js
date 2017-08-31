(function () {
    'use strict';
    angular.module('ZurealdjAdminApp').factory('CoursesFactory', ['AuthHttp', function($http){
        return {

            upsert: function(courses){
                var fd = new FormData();


                if(courses.icon.file){
                    fd.append('course[icon]', courses.icon.file );
                }
                if(courses.title){
                    fd.append('course[title]', courses.title );
                }
                if(courses.detail){
                    fd.append('course[detail]', courses.detail );
                }

                if(courses.id){
                    return $http.put('/admin/courses/' + courses.id, fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }else{
                    return $http.post('/admin/courses', fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }
            },

            all: function(options){
                var url = '/admin/courses.json?';
                if(options.page)
                    url = url + 'page=' + options.page + '&';

                _.each(Object.keys(options.query), function(key){
                    if(options.query[key])
                        url = url + key + '=' + options.query[key] + '&';
                });

                return $http.get(url);
            },

            show: function(id){
                return $http.get('/admin/courses/' + id + '.json');
            },

            destroy: function(id){
                return $http.delete('/admin/courses/' + id)
            },

            downloadCSV: function(options){
                var url = '/admin/courses.csv?';

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