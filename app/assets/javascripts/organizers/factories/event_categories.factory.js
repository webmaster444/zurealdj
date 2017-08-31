(function () {
    'use strict';
    angular.module('ZurealdjOrganizerApp').factory('EventCategoriesFactory', ['AuthHttp', function($http){
        return {
            all: function(options){
                return $http.get('/organizer/event_categories.json');
            }
        }
    }])
}());