(function () {
    'use strict';
    angular.module('ZurealdjDjApp').factory('UsersFactory', ['AuthHttp', function($http){
        return {
            profile: function(){
                return $http.get('/dj/profile');
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

            submit_cancelations: function(user, cancelations){
                cancelations = _.select(cancelations, function(i){ return i.selected });
                cancelations = _.map(cancelations, function(i){ return i.id });
                return $http.post('/dj/users/step', {
                    weekday_rate_from: user.weekday_rate_from,
                    weekday_rate_to: user.weekday_rate_to,
                    weekend_rate_from: user.weekend_rate_from,
                    weekend_rate_to: user.weekend_rate_to,
                    cancelation_ids: cancelations
                })
            },

            step_back: function(){
                return $http.post('/dj/users/step_back')
            },

            save: function(user){
                var fd = new FormData();
                fd.append('name', user.name || '');
                fd.append('dj_attributes[city]', user.city || '');
                fd.append('dj_attributes[country_flag_code]', user.country ? user.country.code : '');
                fd.append('about', user.about || '');
                fd.append('facebook_link', user.facebook_link || '');
                fd.append('instagram_link', user.instagram_link || '');
                fd.append('soundcloud_link', user.soundcloud_link || '');
                fd.append('weekday_rate_from', user.weekday_rate_from || '');
                fd.append('weekday_rate_to', user.weekday_rate_to || '');
                fd.append('weekend_rate_from', user.weekend_rate_from || '');
                fd.append('weekend_rate_to', user.weekend_rate_to || '');
                if(user.sample){
                    fd.append('dj_attributes[sample]', user.sample);
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
                _.each(user.cancelations, function(i){
                    if(i.selected)
                        fd.append('cancelation_ids[]', i.id)
                });

                if(user.avatar.file){
                    fd.append('avatar', user.avatar.file);
                }

                return $http.post('/dj/users/update_profile', fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                })
            }
        }
    }])
}());