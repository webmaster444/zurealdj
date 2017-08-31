(function () {
    'use strict';
    angular.module('ZurealdjAdminApp').factory('CoursesPagesFactory', ['AuthHttp', function($http){
        return {

            upsert: function(page){
                var fd = new FormData();

                if(page.content){
                    fd.append('courses_page[content]', page.content );
                }

                return $http.put('/admin/course_pages', fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                });
            },

            show: function(id){
                return $http.get('/admin/course_pages');
            }
        }
    }])
}());