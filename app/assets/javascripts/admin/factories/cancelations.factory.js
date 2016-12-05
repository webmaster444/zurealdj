(function () {
    'use strict';
    angular.module('ZurealdjAdminApp').factory('CancelationsFactory', ['AuthHttp', function($http){
        return {

            upsert: function(cancelations){
                var fd = new FormData();

                if(cancelations.title){
                    fd.append('cancelation[title]', cancelations.title );
                }

                if(cancelations.id){
                    return $http.put('/admin/cancelations/' + cancelations.id, fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }else{
                    return $http.post('/admin/cancelations', fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }
            },

            all: function(options){
                return $http.get('/admin/cancelations.json?page=' + options.page);
            },

            show: function(id){
                return $http.get('/admin/cancelations/' + id + '.json');
            },

            destroy: function(id){
                return $http.delete('/admin/cancelations/' + id)
            }
        }
    }])
}());