(function () {
    'use strict';
    angular.module('ZurealdjAdminApp').factory('BookingsFactory', ['AuthHttp', function($http){
        return {

            users: function(){
              return $http.get('/admin/bookings/users.json');
            },

            events: function(){
              return $http.get('/admin/bookings/events.json');
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
                    return $http.put('/admin/bookings/' + bookings.id, fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }else{
                    return $http.post('/admin/bookings', fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }
            },

            all: function(options){
                return $http.get('/admin/bookings.json?page=' + options.page);
            },

            show: function(id){
                return $http.get('/admin/bookings/' + id + '.json');
            },

            destroy: function(id){
                return $http.delete('/admin/bookings/' + id)
            }
        }
    }])
}());