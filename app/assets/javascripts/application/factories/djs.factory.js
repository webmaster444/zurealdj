(function () {
    'use strict';
    angular.module('ZurealdjApp').factory('DjsFactory', ['AuthHttp', function($http){
        return {

            upsert: function(djs){
                var fd = new FormData();

                if(djs.first_name){
                    fd.append('djs[first_name]', djs.first_name );
                }
                if(djs.last_name){
                    fd.append('djs[last_name]', djs.last_name );
                }
                if(djs.city){
                    fd.append('djs[city]', djs.city );
                }
                if(djs.country){
                    fd.append('djs[country_flag_code]', djs.country.code );
                }
                if(djs.about){
                    fd.append('djs[about]', djs.about );
                }

                fd.append('djs[sample][file]', djs.sample.file );
                if(djs.sample.id != undefined){
                    fd.append('djs[sample][id]', djs.sample.id );
                    fd.append('djs[sample][removed]', !!djs.sample.removed );
                }
                if(djs.instagram_link){
                    fd.append('djs[instagram_link]', djs.instagram_link );
                }
                if(djs.facebook_link){
                    fd.append('djs[facebook_link]', djs.facebook_link );
                }
                if(djs.soundcloud_link){
                    fd.append('djs[soundcloud_link]', djs.soundcloud_link );
                }
                if(djs.weekday_price_from){
                    fd.append('djs[weekday_price_from]', djs.weekday_price_from );
                }
                if(djs.weekday_price_to){
                    fd.append('djs[weekday_price_to]', djs.weekday_price_to );
                }
                if(djs.weekend_price_from){
                    fd.append('djs[weekend_price_from]', djs.weekend_price_from );
                }
                if(djs.weekend_price_to){
                    fd.append('djs[weekend_price_to]', djs.weekend_price_to );
                }

                fd.append('djs[photo][file]', djs.photo.file );
                if(djs.photo.id != undefined){
                    fd.append('djs[photo][id]', djs.photo.id );
                    fd.append('djs[photo][removed]', !!djs.photo.removed );
                }

                if(djs.id){
                    return $http.put('/djs/' + djs.id, fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }else{
                    return $http.post('/djs', fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }
            },

            all: function(options){
                return $http.get('/djs.json?page=' + options.page);
            },

            show: function(id){
                return $http.get('/djs/' + id + '.json');
            },

            destroy: function(id){
                return $http.delete('/djs/' + id)
            }
        }
    }])
}());