(function () {
    'use strict';
    angular.module('ZurealdjDjApp').factory('MessagesFactory', ['AuthHttp', function($http){
        return {
            all: function(options){

                var url = '/dj/messages?';

                _.each(Object.keys(options), function(key){
                    if(options[key])
                        url = url + key + '=' + options[key] + '&';
                });

                return $http.get(url);
            }
        }
    }])
}());