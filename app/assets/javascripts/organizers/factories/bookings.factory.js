(function () {
    'use strict';
    angular.module('ZurealdjOrganizerApp').factory('BookingsFactory', ['AuthHttp', function($http){
        return {

            book: function(booking){
                var fd = new FormData();
                fd.append('dj_id', booking.dj_id);
                fd.append('event_id', booking.event ? booking.event.id : '');

                fd.append('from_date', booking.from_date || '');
                fd.append('from_time', booking.from_time || '');

                fd.append('to_date', booking.to_date || '');
                fd.append('to_time', booking.to_time || '');

                fd.append('rate', booking.rate || '');

                return $http.put('/organizer/bookings/' + booking.id, fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                });
            },

            destroy: function(id){
                return $http.delete('/organizer/bookings/' + id)
            },

            comment: function(id, comment) {
                var fd = new FormData();

                if(comment){
                    fd.append('comment', comment);
                }

                return $http.put('/organizer/bookings/' + id, fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                });
            }
        }
    }])
}());