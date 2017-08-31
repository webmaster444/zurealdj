(function () {
    'use strict';
    angular.module('ZurealdjAdminApp').factory('EmailSenderFactory', ['AuthHttp', function($http){
        return {
            update: function(general_settings){
                var fd = new FormData();

                fd.append('email_sender[address]', general_settings.address || '');
                fd.append('email_sender[port]', general_settings.port || '');
                fd.append('email_sender[domain]', general_settings.domain || '');
                fd.append('email_sender[authentication]', general_settings.authentication || '');
                fd.append('email_sender[user_name]', general_settings.user_name || '');
                fd.append('email_sender[password]', general_settings.password || '');
                fd.append('email_sender[enable_starttls_auto]', general_settings.enable_starttls_auto || false);

                return $http.put('/admin/email_sender', fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                });
            },

            show: function(){
                return $http.get('/admin/email_sender');
            }
        }
    }])
}());