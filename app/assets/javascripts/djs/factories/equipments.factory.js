(function () {
    'use strict';
    angular.module('ZurealdjDjApp').factory('EquipmentsFactory', ['AuthHttp', function($http){
        return {
            all: function(){
                return $http.get('/dj/equipments.json');
            }
        }
    }])
}());