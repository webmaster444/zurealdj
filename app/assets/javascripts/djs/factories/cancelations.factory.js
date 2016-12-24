(function () {
    'use strict';
    angular.module('ZurealdjDjApp').factory('CancelationsFactory', ['AuthHttp', function($http){
        return {
            all: function(){
                return $http.get('/dj/cancelations.json');
            }
        }
    }])
}());