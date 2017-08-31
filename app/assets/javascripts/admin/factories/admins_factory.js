(function () {
    'use strict';
    angular.module('ZurealdjAdminApp').factory('AdminsFactory', ['AuthHttp', function($http){
        return {
            all: function(options){
                var url = '/admin/admins.json?';
                if(options.page)
                    url = url + 'page=' + options.page + '&';
                _.each(Object.keys(options.query), function(key){
                    if(options.query[key])
                        url = url + key + '=' + options.query[key] + '&';
                });
                return $http.get(url);
            },
            destroy: function (id) {
                return $http.delete('/admin/admins/' + id)
            },
            upsert: function (options) {
                return $http.post('/admin/admins', options)
            }
        }
    }])
}());