(function () {
    'use strict';
    angular.module('ZurealdjOrganizerApp').factory('EquipmentsFactory', ['AuthHttp', function($http){
        return {

            upsert: function(equipments){
                var fd = new FormData();


                fd.append('equipment[icon][file]', equipments.icon.file );
                if(equipments.icon.id != undefined){
                    fd.append('equipment[icon][id]', equipments.icon.id );
                    fd.append('equipment[icon][removed]', !!equipments.icon.removed );
                }
                if(equipments.title){
                    fd.append('equipment[title]', equipments.title );
                }

                if(equipments.id){
                    return $http.put('/equipments/' + equipments.id, fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }else{
                    return $http.post('/equipments', fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }
            },

            all: function(options){
                return $http.get('/equipments.json?page=' + options.page);
            },

            show: function(id){
                return $http.get('/equipments/' + id + '.json');
            },

            destroy: function(id){
                return $http.delete('/equipments/' + id)
            }
        }
    }])
}());