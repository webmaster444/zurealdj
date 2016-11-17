(function () {
    'use strict';
    angular.module('ZurealdjApp').factory('EquipmentsFactory', ['AuthHttp', function($http){
        return {

            upsert: function(equipments){
                var fd = new FormData();


                fd.append('equipments[icon][file]', equipments.icon.file );
                if(equipments.icon.id != undefined){
                    fd.append('equipments[icon][id]', equipments.icon.id );
                    fd.append('equipments[icon][removed]', !!equipments.icon.removed );
                }
                if(equipments.title){
                    fd.append('equipments[title]', equipments.title );
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