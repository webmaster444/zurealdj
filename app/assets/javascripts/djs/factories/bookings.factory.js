(function () {
    'use strict';
    angular.module('ZurealdjDjApp').factory('BookingsFactory', ['AuthHttp', function($http){
        return {

            upsert: function(booking){
                var fd = new FormData();

                if(booking.status) fd.append('status', true);
                else fd.append('status', false);

                return $http.put('/dj/bookings/' + booking.id, fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                })
            }
        }
    }])
}());