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

            step_back: function(){
                return $http.post('/dj/users/step_back')
            }
        }
    }])
}());