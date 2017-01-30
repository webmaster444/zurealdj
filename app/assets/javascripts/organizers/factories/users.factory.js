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

                if(user.avatar && user.avatar.crop_data){
                    fd.append('crop_x', user.avatar.crop_data.x ? user.avatar.crop_data.x : 0);
                    fd.append('crop_y', user.avatar.crop_data.y ? user.avatar.crop_data.y : 0);
                    fd.append('crop_w', user.avatar.crop_data.width ? user.avatar.crop_data.width : '');
                    fd.append('crop_h', user.avatar.crop_data.height ? user.avatar.crop_data.height : '');
                    fd.append('crop_rotate', user.avatar.crop_data.rotate ? user.avatar.crop_data.rotate : 0);
                    fd.append('crop_scale_x', user.avatar.crop_data.scaleX ? user.avatar.crop_data.scaleX : 0);
                    fd.append('crop_scale_y', user.avatar.crop_data.scaleY ? user.avatar.crop_data.scaleY : 0);
                }

                return $http.post('/organizer/users/update_profile', fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                })
            }
        }
    }])
}());