(function () {
    'use strict';
    angular.module('ZurealdjOrganizerApp').factory('EventsFactory', ['AuthHttp', function($http){
        return {

            upsert: function(event){
                console.log(event);
                var fd = new FormData();

                fd.append('event[title]', event.title || '');
                fd.append('event[city]', event.city || '');
                if(event.country && event.country.code){
                    fd.append('event[country_flag_code]', event.country.code);
                }

                if(event.image && event.image.file){
                    fd.append('event[image]', event.image.file );
                }

                if(event.start_date){
                    fd.append('event[start_date]', event.start_date );
                }

                if(event.end_date){
                    fd.append('event[end_date]', event.end_date );
                }

                if(event.id){
                    return $http.put('/organizer/events/' + event.id, fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }else{
                    return $http.post('/organizer/events', fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }
            },

            all: function(options){
                return $http.get('/organizer/events.json?page=' + options.page);
            },

            show: function(id){
                return $http.get('/organizer/events/' + id + '.json');
            },

            destroy: function(id){
                return $http.delete('/organizer/events/' + id)
            }
        }
    }])
}());