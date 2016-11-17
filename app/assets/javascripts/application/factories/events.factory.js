(function () {
    'use strict';
    angular.module('ZurealdjApp').factory('EventsFactory', ['AuthHttp', function($http){
        return {

            upsert: function(events){
                var fd = new FormData();

                if(events.title){
                    fd.append('events[title]', events.title );
                }
                if(events.city){
                    fd.append('events[city]', events.city );
                }
                if(events.country){
                    fd.append('events[country_flag_code]', events.country.code );
                }
                if(events.address){
                    fd.append('events[address]', events.address );
                }
                if(events.start_date){
                    fd.append('events[start_date]', events.start_date );
                }
                if(events.end_date){
                    fd.append('events[end_date]', events.end_date );
                }

                fd.append('events[image][file]', events.image.file );
                if(events.image.id != undefined){
                    fd.append('events[image][id]', events.image.id );
                    fd.append('events[image][removed]', !!events.image.removed );
                }

                if(events.id){
                    return $http.put('/events/' + events.id, fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }else{
                    return $http.post('/events', fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }
            },

            all: function(options){
                return $http.get('/events.json?page=' + options.page);
            },

            show: function(id){
                return $http.get('/events/' + id + '.json');
            },

            destroy: function(id){
                return $http.delete('/events/' + id)
            }
        }
    }])
}());