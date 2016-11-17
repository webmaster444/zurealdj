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
                .state('new_cancelation',{
                    url: '/cancelation/new',
                    templateUrl: 'application/templates/cancelations/form.html',
                    controller: 'CancelationsController'
                })
            $stateProvider
                .state('show_cancelation',{
                    url: '/cancelation/:id',
                    templateUrl: 'application/templates/cancelations/show.html',
                    controller: 'CancelationsController'
                });
            $stateProvider
                .state('edit_cancelation',{
                    url: '/cancelation/:id/edit',
                    templateUrl: 'application/templates/cancelations/form.html',
                    controller: 'CancelationsController'
                })
            $stateProvider
                .state('cancelations',{
                    url: '/cancelations',
                    templateUrl: 'application/templates/cancelations/index.html',
                    controller: 'CancelationsController'
                })
            $stateProvider
                .state('new_event_category',{
                    url: '/event_category/new',
                    templateUrl: 'application/templates/event_categories/form.html',
                    controller: 'EventCategoriesController'
                })
            $stateProvider
                .state('show_event_category',{
                    url: '/event_category/:id',
                    templateUrl: 'application/templates/event_categories/show.html',
                    controller: 'EventCategoriesController'
                });
            $stateProvider
                .state('edit_event_category',{
                    url: '/event_category/:id/edit',
                    templateUrl: 'application/templates/event_categories/form.html',
                    controller: 'EventCategoriesController'
                })
            $stateProvider
                .state('event_categories',{
                    url: '/event_categories',
                    templateUrl: 'application/templates/event_categories/index.html',
                    controller: 'EventCategoriesController'
                })
            $stateProvider
                .state('new_equipment',{
                    url: '/equipment/new',
                    templateUrl: 'application/templates/equipments/form.html',
                    controller: 'EquipmentsController'
                })
            $stateProvider
                .state('show_equipment',{
                    url: '/equipment/:id',
                    templateUrl: 'application/templates/equipments/show.html',
                    controller: 'EquipmentsController'
                });
            $stateProvider
                .state('edit_equipment',{
                    url: '/equipment/:id/edit',
                    templateUrl: 'application/templates/equipments/form.html',
                    controller: 'EquipmentsController'
                })
            $stateProvider
                .state('equipments',{
                    url: '/equipments',
                    templateUrl: 'application/templates/equipments/index.html',
                    controller: 'EquipmentsController'
                })
            $stateProvider
                .state('new_who_we_are_page',{
                    url: '/who_we_are_page/new',
                    templateUrl: 'application/templates/who_we_are_pages/form.html',
                    controller: 'WhoWeArePagesController'
                })
            $stateProvider
                .state('show_who_we_are_page',{
                    url: '/who_we_are_page/:id',
                    templateUrl: 'application/templates/who_we_are_pages/show.html',
                    controller: 'WhoWeArePagesController'
                });
            $stateProvider
                .state('edit_who_we_are_page',{
                    url: '/who_we_are_page/:id/edit',
                    templateUrl: 'application/templates/who_we_are_pages/form.html',
                    controller: 'WhoWeArePagesController'
                })
            $stateProvider
                .state('who_we_are_pages',{
                    url: '/who_we_are_pages',
                    templateUrl: 'application/templates/who_we_are_pages/index.html',
                    controller: 'WhoWeArePagesController'
                })
            $stateProvider
                .state('new_crew_page',{
                    url: '/crew_page/new',
                    templateUrl: 'application/templates/crew_pages/form.html',
                    controller: 'CrewPagesController'
                })
            $stateProvider
                .state('show_crew_page',{
                    url: '/crew_page/:id',
                    templateUrl: 'application/templates/crew_pages/show.html',
                    controller: 'CrewPagesController'
                });
            $stateProvider
                .state('edit_crew_page',{
                    url: '/crew_page/:id/edit',
                    templateUrl: 'application/templates/crew_pages/form.html',
                    controller: 'CrewPagesController'
                })
            $stateProvider
                .state('crew_pages',{
                    url: '/crew_pages',
                    templateUrl: 'application/templates/crew_pages/index.html',
                    controller: 'CrewPagesController'
                })
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