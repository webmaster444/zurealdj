(function () {
    'use strict';
    angular.module('ZurealdjAdminApp').factory('DjsFactory', ['AuthHttp', function($http){
        return {

            upsert: function(djs){
                var fd = new FormData();

                if(djs.name){
                    fd.append('dj[name]', djs.name );
                }
                if(djs.email){
                    fd.append('dj[email]', djs.email );
                }
                if(djs.personal_url){
                    fd.append('dj[personal_url]', djs.personal_url );
                }

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

                if(djs.sample.url !== null){
                    fd.append('dj[sample]', djs.sample);
                }
                else{
                    fd.append('dj[sample][url]', djs.sample_url);
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
                    fd.append('dj[weekday_rate_from]', djs.weekday_rate_from );
                }
                if(djs.weekday_price_to){
                    fd.append('dj[weekday_rate_to]', djs.weekday_rate_to );
                }
                if(djs.weekend_price_from){
                    fd.append('dj[weekend_rate_from]', djs.weekend_rate_from );
                }
                if(djs.weekend_price_to){
                    fd.append('dj[weekend_rate_to]', djs.weekend_rate_to );
                }

                if(djs.avatar.file){
                    fd.append('dj[avatar]', djs.avatar.file);
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
                return $http.delete('/admin/djs/' + id)
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