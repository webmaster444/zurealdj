(function () {
    'use strict';
    angular.module('ZurealdjOrganizerApp').factory('EventsFactory', ['AuthHttp', function($http){
        return {

            upsert: function(event){
                var fd = new FormData();

                fd.append('title', event.title || '');
                fd.append('city', event.city || '');
                if(event.country && event.country.code){
                    fd.append('country_flag_code', event.country.code);
                }

                if(event.image && event.image.file){
                    fd.append('image', event.image.file );
                }

                if(event.start_date){
                    fd.append('start_date', event.start_date );
                }

                if(event.start_time){
                    fd.append('start_time', event.start_time );
                }

                if(event.end_date){
                    fd.append('end_date', event.end_date );
                }

                if(event.end_time){
                    fd.append('end_time', event.end_time );
                }

                if(event.event_category){
                    fd.append('event_category_id', event.event_category.id );
                }

                if(event.dj_slots){
                    fd.append('dj_slots', event.dj_slots );
                }

                if(event.image && event.image.crop_data){
                    fd.append('crop_x', event.image.crop_data.x ? event.image.crop_data.x : 0);
                    fd.append('crop_y', event.image.crop_data.y ? event.image.crop_data.y : 0);
                    fd.append('crop_w', event.image.crop_data.width ? event.image.crop_data.width : '');
                    fd.append('crop_h', event.image.crop_data.height ? event.image.crop_data.height : '');
                    fd.append('crop_rotate', event.image.crop_data.rotate ? event.image.crop_data.rotate : 0);
                    fd.append('crop_scale_x', event.image.crop_data.scaleX ? event.image.crop_data.scaleX : 0);
                    fd.append('crop_scale_y', event.image.crop_data.scaleY ? event.image.crop_data.scaleY : 0);
                }

                if(event.genres){

                    event.genres.forEach(function(genre) {
                        if(genre.checked){
                            fd.append('genres[]', genre.id);
                        }
                    });
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

                var url = '/organizer/events.json?';

                _.each(Object.keys(options), function(key){
                    if(options[key])
                        url += key + '=' + options[key] + '&';
                });

                return $http.get(url);
            },

            filter: function(options){

                var url = '/organizer/events.json?';

                _.each(Object.keys(options), function(key){
                    if(options[key]){

                        if (key == "genres"){

                            options[key].forEach(function(genre) {
                                if(genre.checked){
                                    url += 'gid[]=' + genre.id + '&';
                                }
                            });

                        } else if (key == "event_types"){

                            options[key].forEach(function(types) {
                                if(types.checked){
                                    url += 'tid[]=' + types.id + '&';
                                }
                            });

                        } else {
                            url += key + '=' + options[key] + '&';
                        }
                    }

                });

                return $http.get(url);
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