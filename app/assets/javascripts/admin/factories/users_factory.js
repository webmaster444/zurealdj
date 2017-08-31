(function () {
    'use strict';
    angular.module('ZurealdjAdminApp').factory('UsersFactory', ['AuthHttp', function($http){
        return {

            myProfile: function(){
                return $http.get('/admin/users/profile.json');
            },

            updateMyProfile: function(admin){
                var fd = new FormData();
                fd.append('current_password', admin.current_password || '' );
                fd.append('user[password]', admin.password || '' );
                fd.append('user[password_confirmation]', admin.password_confirmation || '');

                    return $http.put('/admin/users', fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
            }
        }
    }])
}());