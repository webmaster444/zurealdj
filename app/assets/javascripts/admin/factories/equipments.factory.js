(function () {
    'use strict';
    angular.module('ZurealdjAdminApp').factory('EquipmentsFactory', ['AuthHttp', function($http){
        return {

            upsert: function(equipments){
                var fd = new FormData();


                if(equipments.icon.file){
                    fd.append('equipment[icon]', equipments.icon.file );
                }
                if(equipments.title){
                    fd.append('equipment[title]', equipments.title );
                }

                if(equipments.id){
                    return $http.put('/admin/equipments/' + equipments.id, fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }else{
                    return $http.post('/admin/equipments', fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }
            },

            all: function(options){
                return $http.get('/admin/equipments.json?page=' + options.page);
            },

            show: function(id){
                return $http.get('/admin/equipments/' + id + '.json');
            },

            destroy: function(id){
                return $http.delete('/admin/equipments/' + id)
            }
        }
    }])
}());