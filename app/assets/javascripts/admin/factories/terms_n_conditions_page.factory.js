(function () {
    'use strict';
    angular.module('ZurealdjAdminApp').factory('TermsNConditionsPagesFactory', ['AuthHttp', function($http){
        return {

            upsert: function(terms_n_conditions_page){
                var fd = new FormData();

                fd.append('terms_n_conditions_page[content]', terms_n_conditions_page.content || '');

                return $http.put('/admin/terms_n_conditions_pages/1', fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                });
            },

            show: function(id){
                return $http.get('/admin/terms_n_conditions_pages/1.json');
            }
        }
    }])
}());