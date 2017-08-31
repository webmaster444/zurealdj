(function () {
    'use strict';
    angular.module('ZurealdjAdminApp').factory('AboutSlidesFactory', ['AuthHttp', function($http){
        return {
            all: function(options){
                return $http.get('/admin/about_slides.json?page=' + options.page);
            },
            show: function(id){
                return $http.get('/admin/about_slides/' + id + '.json');
            },
            upsert: function(slide){
                var url = "/admin/about_slides";
                var fd = new FormData();

                fd.append('slide[content]', slide.content || '');

                if(slide.id){
                    return $http.put(url + '/' + slide.id, fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }else{
                    return $http.post(url, fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }
            },
            destroy: function(id){
                return $http.delete('/admin/about_slides/' + id)
            }
        }
    }])
}());