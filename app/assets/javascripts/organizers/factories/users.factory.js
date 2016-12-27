(function () {
    'use strict';
    angular.module('ZurealdjOrganizerApp').factory('UsersFactory', ['AuthHttp', function($http){
        return {
            profile: function(){
                return $http.get('/organizer/profile');
            },

            submit_event_types: function(event_types){
                event_types = _.select(event_types, function(i){ return i.selected });
                event_types = _.map(event_types, function(i){ return i.id });
                return $http.post('/organizer/users/step', {
                    event_category_ids: event_types
                })
            },

            submit_genres: function(genres){
                genres = _.select(genres, function(i){ return i.selected });
                genres = _.map(genres, function(i){ return i.id });
                return $http.post('/organizer/users/step', {
                    genre_ids: genres
                })
            },

            submit_equipments: function(equipments){
                equipments = _.select(equipments, function(i){ return i.selected });
                equipments = _.map(equipments, function(i){ return i.id });
                return $http.post('/organizer/users/step', {
                    equipment_ids: equipments
                })
            },

            submit_personal_url: function(user){
                return $http.post('/organizer/users/step', {
                    personal_url: user.personal_url
                })
            },

            submit_company_name: function(user){
                return $http.post('/organizer/users/step', {
                    company_name: user.company_name
                })
            },
            
            step_back: function(){
                return $http.post('/organizer/users/step_back')
            },

            save: function(user){
                var fd = new FormData();
                fd.append('name', user.name || '');
                fd.append('company_name', user.company_name || '');
                fd.append('organizer_attributes[city]', user.city || '');
                fd.append('organizer_attributes[country_flag_code]', user.country ? user.country.code : '');
                fd.append('about', user.about || '');
                fd.append('facebook_link', user.facebook_link || '');
                fd.append('instagram_link', user.instagram_link || '');
                fd.append('soundcloud_link', user.soundcloud_link || '');
                _.each(user.event_types, function(i){
                    if(i.selected)
                        fd.append('event_category_ids[]', i.id)
                });
                _.each(user.genres, function(i){
                    if(i.selected)
                        fd.append('genre_ids[]', i.id)
                });

                if(user.avatar.file){
                    fd.append('avatar', user.avatar.file);
                }

                return $http.post('/organizer/users/update_profile', fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                })
            }
        }
    }])
}());