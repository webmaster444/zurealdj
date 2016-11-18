(function () {
    'use strict';
    angular.module('ZurealdjAdminApp').factory('TermsNConditionsPagesFactory', ['AuthHttp', function($http){
        return {

            upsert: function(terms_n_conditions_page){
                var fd = new FormData();

                fd.append('terms_n_conditions_page[content]', terms_n_conditions_page.content || '');

                if(terms_n_conditions_page.id){
                    return $http.put('/terms_n_conditions_pages/' + terms_n_conditions_page.id, fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }else{
                    return $http.post('/terms_n_conditions_pages', fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }
            },

            all: function(options){
                return $http.get('/terms_n_conditions_pages.json?page=' + options.page);
            },

            show: function(id){
                return $http.get('/terms_n_conditions_pages/' + id + '.json');
            },

            destroy: function(id){
                return $http.delete('/terms_n_conditions_pages/' + id)
            }
        }
    }])
}());