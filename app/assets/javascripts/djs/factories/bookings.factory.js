(function () {
    'use strict';
    angular.module('ZurealdjDjApp').factory('BookingsFactory', ['AuthHttp', function($http){
        return {

            upsert: function(booking){
                var fd = new FormData();

                fd.append('status', booking.status.toLowerCase());

                return $http.put('/dj/bookings/' + booking.id, fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                })
            }
        }
    }])
}());