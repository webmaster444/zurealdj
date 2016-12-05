(function () {
    'use strict';
    angular.module('ZurealdjAdminApp').factory('EventsFactory', ['AuthHttp', function($http){
        return {

            upsert: function(events){
                var fd = new FormData();

                if(events.title){
                    fd.append('event[title]', events.title );
                }
                if(events.city){
                    fd.append('event[city]', events.city );
                }
                if(events.country){
                    fd.append('event[country_flag_code]', events.country.code );
                }
                if(events.address){
                    fd.append('event[address]', events.address );
                }
                if(events.start_date){
                    fd.append('event[start_date]', events.start_date );
                }
                if(events.end_date){
                    fd.append('event[end_date]', events.end_date );
                }

                fd.append('event[image][file]', events.image.file );
                if(events.image.id != undefined){
                    fd.append('event[image][id]', events.image.id );
                    fd.append('event[image][removed]', !!events.image.removed );
                }

                if(events.id){
                    return $http.put('/admin/events/' + events.id, fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }else{
                    return $http.post('/admin/events', fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }
            },

            all: function(options){
                return $http.get('/admin/events.json?page=' + options.page);
            },

            show: function(id){
                return $http.get('/admin/events/' + id + '.json');
            },

            destroy: function(id){
                return $http.delete('/admin/events/' + id)
            }
        }
    }])
}());