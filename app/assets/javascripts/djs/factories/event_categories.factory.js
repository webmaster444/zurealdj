(function () {
    'use strict';
    angular.module('ZurealdjDjApp').factory('EventCategoriesFactory', ['AuthHttp', function($http){
        return {
            all: function(){
                return $http.get('/dj/event_categories.json?');
            }
        }
    }])
}());