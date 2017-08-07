(function () {
    'use strict';
    angular.module('ZurealdjDjApp').factory('UsersFactory', ['AuthHttp', function($http){
        return {
            step_data: function(){
                return $http.get('/dj/step_data');
            },

            profile: function(){
                return $http.get('/dj/profile');
            },

            policy: function(){
                return $http.get('/static_pages/cancelations')
            },

            submit_event_types: function(event_types){
                event_types = _.select(event_types, function(i){ return i.selected });
                event_types = _.map(event_types, function(i){ return i.id });
                return $http.post('/dj/users/step', {
                    event_category_ids: event_types
                })
            },

            submit_genres: function(genres){
                genres = _.select(genres, function(i){ return i.selected });
                genres = _.map(genres, function(i){ return i.id });
                return $http.post('/dj/users/step', {
                    genre_ids: genres
                })
            },

            submit_equipments: function(equipments){
                equipments = _.select(equipments, function(i){ return i.selected });
                equipments = _.map(equipments, function(i){ return i.id });
                return $http.post('/dj/users/step', {
                    equipment_ids: equipments
                })
            },

            submit_personal_url: function(user){
                return $http.post('/dj/users/step', {
                    personal_url: user.personal_url
                })
            },

            submit_cancelations: function(user){

                var ratePerHour ;
                var free_to_hire = false;

                if(user.free_to_hire == true){
                    ratePerHour = 0;
                    free_to_hire = true;
                } else {
                    ratePerHour = user.rate_per_hour;
                }

                return $http.post('/dj/users/step', {
                    dj_attributes: {

                        rate_per_hour: ratePerHour,
                        free_to_hire: free_to_hire,
                        negotiation: user.negotiation
                    },
                    agree: user.agree,
                })
            },

            step_back: function(){
                return $http.post('/dj/users/step_back')
            },

            save: function(user){
                var fd = new FormData();
                var ratePerHour = 0;
                var free_to_hire = false;
                fd.append('name', user.name || '');
                fd.append('dj_or_venue_name', user.dj_or_venue_name || '');
                fd.append('dj_attributes[city]', user.city || '');
                fd.append('dj_attributes[country_flag_code]', user.country ? user.country.code : '');
                fd.append('about', user.about || '');

                if(user.free_to_hire){
                    free_to_hire = true;
                } else {
                    ratePerHour = user.rate_per_hour;
                }
                fd.append('dj_attributes[rate_per_hour]', ratePerHour);
                fd.append('dj_attributes[free_to_hire]', free_to_hire);

                if(user.sample){
                    if(user.sample.new) fd.append('dj_attributes[sample]', user.sample.new);
                    if(user.sample.name) fd.append('dj_attributes[sample_title]', user.sample.name);
                    if(user.sample.removed) fd.append('sample_removed', user.sample.removed);
                }

                _.each(user.event_types, function(i){
                    if(i.selected)
                        fd.append('event_category_ids[]', i.id)
                });
                _.each(user.genres, function(i){
                    if(i.selected)
                        fd.append('genre_ids[]', i.id)
                });
                _.each(user.equipments, function(i){
                    if(i.selected)
                        fd.append('equipment_ids[]', i.id)
                });

                if(fd.get('equipment_ids[]')==null)
                    fd.append('equipment_ids[]', '');
                if(fd.get('event_category_ids[]')==null)
                    fd.append('event_category_ids[]', '');
                if(fd.get('genre_ids[]')==null)
                    fd.append('genre_ids[]', '');

                if(user.avatar.file){
                    fd.append('avatar', user.avatar.file);
                }

                if(user.avatar && user.avatar.crop_data){
                    fd.append('crop_x', user.avatar.crop_data.x ? user.avatar.crop_data.x : 0);
                    fd.append('crop_y', user.avatar.crop_data.y ? user.avatar.crop_data.y : 0);
                    fd.append('crop_w', user.avatar.crop_data.width ? user.avatar.crop_data.width : '');
                    fd.append('crop_h', user.avatar.crop_data.height ? user.avatar.crop_data.height : '');
                    fd.append('crop_rotate', user.avatar.crop_data.rotate ? user.avatar.crop_data.rotate : 0);
                    fd.append('crop_scale_x', user.avatar.crop_data.scaleX ? user.avatar.crop_data.scaleX : 0);
                    fd.append('crop_scale_y', user.avatar.crop_data.scaleY ? user.avatar.crop_data.scaleY : 0);
                }

                return $http.post('/dj/users/update_profile', fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                })
            },

            comments: function(options){
                if(!options)
                    options = {};

                var url = '/dj/users/comments.json?';

                _.each(Object.keys(options), function(key){
                    if(options[key])
                        url += key + '=' + options[key] + '&';
                });

                return $http.get(url);
            }
        }
    }])
}());