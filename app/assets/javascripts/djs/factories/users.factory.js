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
            }
        }
    }])
}());