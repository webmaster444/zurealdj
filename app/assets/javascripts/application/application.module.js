(function () {
    "use strict";
    var ZurealdjApp = angular.module('ZurealdjApp', [
        'ui.router',
        'templates',
        'ngDialog',
        'validation.match',
        'validation.email',
        'fileread',
        'ui.bootstrap',
        'bootstrapLightbox',
        'ui-rangeSlider',
        'redactor',
        'formInput.images',
        'formInput.image',
        'toaster',
        'angular-ladda',
        'AuthHttp',
        'oitozero.ngSweetAlert'
    ]);

    ZurealdjApp.config(['$urlRouterProvider', '$stateProvider', '$httpProvider',
        function ($urlRouterProvider, $stateProvider, $httpProvider) {

            $httpProvider.defaults.headers.common['X-Requested-With'] = 'AngularXMLHttpRequest';

            $urlRouterProvider.otherwise('home');

            $stateProvider
                .state('home',{
                  url: '',
                  templateUrl: 'application/templates/home/index.html',
                  controller: 'HomeController'
                })
                .state('profile',{
                    url: '/profile',
                    templateUrl: 'application/templates/users/edit.html',
                    controller: 'UsersController'
                });
            // generated routes:
            $stateProvider
                .state('new_how_we_work_page',{
                    url: '/how_we_work_page/new',
                    templateUrl: 'application/templates/how_we_work_pages/form.html',
                    controller: 'HowWeWorkPagesController'
                })
            $stateProvider
                .state('show_how_we_work_page',{
                    url: '/how_we_work_page/:id',
                    templateUrl: 'application/templates/how_we_work_pages/show.html',
                    controller: 'HowWeWorkPagesController'
                });
            $stateProvider
                .state('edit_how_we_work_page',{
                    url: '/how_we_work_page/:id/edit',
                    templateUrl: 'application/templates/how_we_work_pages/form.html',
                    controller: 'HowWeWorkPagesController'
                })
            $stateProvider
                .state('how_we_work_pages',{
                    url: '/how_we_work_pages',
                    templateUrl: 'application/templates/how_we_work_pages/index.html',
                    controller: 'HowWeWorkPagesController'
                })
            $stateProvider
                .state('new_policies_page',{
                    url: '/policies_page/new',
                    templateUrl: 'application/templates/policies_pages/form.html',
                    controller: 'PoliciesPagesController'
                })
            $stateProvider
                .state('show_policies_page',{
                    url: '/policies_page/:id',
                    templateUrl: 'application/templates/policies_pages/show.html',
                    controller: 'PoliciesPagesController'
                });
            $stateProvider
                .state('edit_policies_page',{
                    url: '/policies_page/:id/edit',
                    templateUrl: 'application/templates/policies_pages/form.html',
                    controller: 'PoliciesPagesController'
                })
            $stateProvider
                .state('policies_pages',{
                    url: '/policies_pages',
                    templateUrl: 'application/templates/policies_pages/index.html',
                    controller: 'PoliciesPagesController'
                })
            $stateProvider
                .state('new_terms_n_conditions_page',{
                    url: '/terms_n_conditions_page/new',
                    templateUrl: 'application/templates/terms_n_conditions_pages/form.html',
                    controller: 'TermsNConditionsPagesController'
                })
            $stateProvider
                .state('show_terms_n_conditions_page',{
                    url: '/terms_n_conditions_page/:id',
                    templateUrl: 'application/templates/terms_n_conditions_pages/show.html',
                    controller: 'TermsNConditionsPagesController'
                });
            $stateProvider
                .state('edit_terms_n_conditions_page',{
                    url: '/terms_n_conditions_page/:id/edit',
                    templateUrl: 'application/templates/terms_n_conditions_pages/form.html',
                    controller: 'TermsNConditionsPagesController'
                })
            $stateProvider
                .state('terms_n_conditions_pages',{
                    url: '/terms_n_conditions_pages',
                    templateUrl: 'application/templates/terms_n_conditions_pages/index.html',
                    controller: 'TermsNConditionsPagesController'
                })
            $stateProvider
                .state('new_cancelations_page',{
                    url: '/cancelations_page/new',
                    templateUrl: 'application/templates/cancelations_pages/form.html',
                    controller: 'CancelationsPagesController'
                })
            $stateProvider
                .state('show_cancelations_page',{
                    url: '/cancelations_page/:id',
                    templateUrl: 'application/templates/cancelations_pages/show.html',
                    controller: 'CancelationsPagesController'
                });
            $stateProvider
                .state('edit_cancelations_page',{
                    url: '/cancelations_page/:id/edit',
                    templateUrl: 'application/templates/cancelations_pages/form.html',
                    controller: 'CancelationsPagesController'
                })
            $stateProvider
                .state('cancelations_pages',{
                    url: '/cancelations_pages',
                    templateUrl: 'application/templates/cancelations_pages/index.html',
                    controller: 'CancelationsPagesController'
                })
    }]);

    ZurealdjApp.run(['$http', '$rootScope', function($http, $rootScope){
        var csrf_token = $('meta[name="csrf-token"]').attr('content');
        $http.defaults.headers.common['X-CSRF-Token'] = csrf_token;
    }]);

}());