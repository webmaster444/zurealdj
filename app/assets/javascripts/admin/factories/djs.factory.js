(function () {
    'use strict';
    angular.module('ZurealdjAdminApp').factory('DjsFactory', ['AuthHttp', function($http){
        return {

            upsert: function(djs){
                var fd = new FormData();

                if(djs.first_name){
                    fd.append('dj[first_name]', djs.first_name );
                }
                if(djs.last_name){
                    fd.append('dj[last_name]', djs.last_name );
                }
                if(djs.city){
                    fd.append('dj[city]', djs.city );
                }
                if(djs.country){
                    fd.append('dj[country_flag_code]', djs.country.code );
                }
                if(djs.about){
                    fd.append('dj[about]', djs.about );
                }

                fd.append('djs[sample][file]', djs.sample.file );
                if(djs.sample.id != undefined){
                    fd.append('dj[sample][id]', djs.sample.id );
                    fd.append('dj[sample][removed]', !!djs.sample.removed );
                }
                if(djs.instagram_link){
                    fd.append('dj[instagram_link]', djs.instagram_link );
                }
                if(djs.facebook_link){
                    fd.append('dj[facebook_link]', djs.facebook_link );
                }
                if(djs.soundcloud_link){
                    fd.append('dj[soundcloud_link]', djs.soundcloud_link );
                }
                if(djs.weekday_price_from){
                    fd.append('dj[weekday_price_from]', djs.weekday_price_from );
                }
                if(djs.weekday_price_to){
                    fd.append('dj[weekday_price_to]', djs.weekday_price_to );
                }
                if(djs.weekend_price_from){
                    fd.append('dj[weekend_price_from]', djs.weekend_price_from );
                }
                if(djs.weekend_price_to){
                    fd.append('dj[weekend_price_to]', djs.weekend_price_to );
                }

                fd.append('djs[photo][file]', djs.photo.file );
                if(djs.photo.id != undefined){
                    fd.append('dj[photo][id]', djs.photo.id );
                    fd.append('dj[photo][removed]', !!djs.photo.removed );
                }

                if(djs.id){
                    return $http.put('/admin/djs/' + djs.id, fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }else{
                    return $http.post('/admin/djs', fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }
            },

            all: function(options){
                var url = '/admin/djs.json?';
                if(options.page)
                    url = url + 'page=' + options.page + '&';

                _.each(Object.keys(options.query), function(key){
                    if(options.query[key])
                        url = url + key + '=' + options.query[key] + '&';
                });

                return $http.get(url);
            },

            show: function(id){
                return $http.get('/admin/djs/' + id + '.json');
            },

            destroy: function(id){
                return $http.delete('/djs/' + id)
            },

            downloadCSV: function(options){
                var url = '/admin/djs.csv?';

                _.each(Object.keys(options.query), function(key){
                    if(options.query[key]){
                        url = url + key + '=' + options.query[key] + '&';
                    }
                });

                $http.download(url, options);
            }
        }
    }])
}());