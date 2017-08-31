(function () {
    'use strict';
    angular.module('ZurealdjDjApp').factory('SettingsFactory', ['AuthHttp', function($http){
        return {

            show: function() {
                return $http.get('/dj/settings.json');
            },

            upsert: function(user){
                var fd = new FormData();

                fd.append('new_email', user.new_email || '');
                if(user.personal_url){
                    fd.append('personal_url', user.personal_url);
                }
                if(user.current_password){
                    fd.append('current_password', user.current_password);
                }
                if(user.password){
                    fd.append('password', user.password);
                }
                if(user.password_confirmation){
                    fd.append('password_confirmation', user.password_confirmation);
                }

                return $http.put('/dj/settings/' + user.id, fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                })
            },

            updateNotifications: function(user){
                var fd = new FormData();

                if(user.notifications){
                    fd.append('notifications', true);
                }
                else{
                    fd.append('notifications', false);
                }

                return $http.post('/dj/settings/notifications', fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                })
            }
        }
    }])
}());