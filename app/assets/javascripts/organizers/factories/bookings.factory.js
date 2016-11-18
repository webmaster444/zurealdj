(function () {
    'use strict';
    angular.module('ZurealdjApp').factory('BookingsFactory', ['AuthHttp', function($http){
        return {

            users: function(){
              return $http.get('/bookings/users.json');
            },

            events: function(){
              return $http.get('/bookings/events.json');
            },

            upsert: function(bookings){
                var fd = new FormData();

                if(bookings.user){
                    fd.append('booking[user]', bookings.user );
                }
                if(bookings.event){
                    fd.append('booking[event]', bookings.event );
                }

                if(bookings.id){
                    return $http.put('/bookings/' + bookings.id, fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }else{
                    return $http.post('/bookings', fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }
            },

            all: function(options){
                return $http.get('/bookings.json?page=' + options.page);
            },

            show: function(id){
                return $http.get('/bookings/' + id + '.json');
            },

            destroy: function(id){
                return $http.delete('/bookings/' + id)
            }
        }
    }])
}());