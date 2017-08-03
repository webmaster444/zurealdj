(function () {
    'use strict';
    angular.module('ZurealdjLandingApp').factory('CoursesFactory', ['AuthHttp', function($http){
        return {
            all: function(){
                return $http.get('/courses');
            }
        }
    }])
}());