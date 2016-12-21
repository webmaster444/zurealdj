(function () {
    "use strict";
    var ZurealdjDjApp = angular.module('ZurealdjDjApp', [
        'ui.router',
        'templates',
        'ngDialog',
        'validation.match',
        'validation.email',
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

    ZurealdjDjApp.config(['$urlRouterProvider', '$stateProvider', '$httpProvider',
        function ($urlRouterProvider, $stateProvider, $httpProvider) {

            $httpProvider.defaults.headers.common['X-Requested-With'] = 'AngularXMLHttpRequest';

            $urlRouterProvider.otherwise('home');

            $stateProvider.state('home',{
                  url: '',
                  templateUrl: 'djs/templates/home/index.html',
                  controller: 'DashboardController'
                })
                .state('profile',{
                    url: '/profile',
                    templateUrl: 'djs/templates/users/edit.html',
                    controller: 'UsersController'
                })
            // generated routes:
                .state('new_organization',{
                    url: '/organization/new',
                    templateUrl: 'djs/templates/organizations/form.html',
                    controller: 'OrganizationsController'
                })
                .state('show_organization',{
                    url: '/organization/:id',
                    templateUrl: 'djs/templates/organizations/show.html',
                    controller: 'OrganizationsController'
                })
                .state('edit_organization',{
                    url: '/organization/:id/edit',
                    templateUrl: 'djs/templates/organizations/form.html',
                    controller: 'OrganizationsController'
                })
                .state('organizations',{
                    url: '/organizations',
                    templateUrl: 'djs/templates/organizations/index.html',
                    controller: 'OrganizationsController'
                })
                .state('new_dj',{
                    url: '/dj/new',
                    templateUrl: 'djs/templates/djs/form.html',
                    controller: 'DjsController'
                })
                .state('show_dj',{
                    url: '/dj/:id',
                    templateUrl: 'djs/templates/djs/show.html',
                    controller: 'DjsController'
                })
                .state('edit_dj',{
                    url: '/dj/:id/edit',
                    templateUrl: 'djs/templates/djs/form.html',
                    controller: 'DjsController'
                })
                .state('djs',{
                    url: '/djs',
                    templateUrl: 'djs/templates/djs/index.html',
                    controller: 'DjsController'
                })
                .state('new_booking',{
                    url: '/booking/new',
                    templateUrl: 'djs/templates/bookings/form.html',
                    controller: 'BookingsController'
                })
                .state('show_booking',{
                    url: '/booking/:id',
                    templateUrl: 'djs/templates/bookings/show.html',
                    controller: 'BookingsController'
                })
                .state('edit_booking',{
                    url: '/booking/:id/edit',
                    templateUrl: 'djs/templates/bookings/form.html',
                    controller: 'BookingsController'
                })
                .state('bookings',{
                    url: '/bookings',
                    templateUrl: 'djs/templates/bookings/index.html',
                    controller: 'BookingsController'
                })
                .state('new_event',{
                    url: '/event/new',
                    templateUrl: 'djs/templates/events/form.html',
                    controller: 'EventsController'
                })
                .state('show_event',{
                    url: '/event/:id',
                    templateUrl: 'djs/templates/events/show.html',
                    controller: 'EventsController'
                })
                .state('edit_event',{
                    url: '/event/:id/edit',
                    templateUrl: 'djs/templates/events/form.html',
                    controller: 'EventsController'
                })
                .state('events',{
                    url: '/events',
                    templateUrl: 'djs/templates/events/index.html',
                    controller: 'EventsController'
                })
                .state('new_genre',{
                    url: '/genre/new',
                    templateUrl: 'djs/templates/genres/form.html',
                    controller: 'GenresController'
                })
                .state('show_genre',{
                    url: '/genre/:id',
                    templateUrl: 'djs/templates/genres/show.html',
                    controller: 'GenresController'
                })
                .state('edit_genre',{
                    url: '/genre/:id/edit',
                    templateUrl: 'djs/templates/genres/form.html',
                    controller: 'GenresController'
                })
                .state('genres',{
                    url: '/genres',
                    templateUrl: 'djs/templates/genres/index.html',
                    controller: 'GenresController'
                })
                .state('new_cancelation',{
                    url: '/cancelation/new',
                    templateUrl: 'djs/templates/cancelations/form.html',
                    controller: 'CancelationsController'
                })
                .state('show_cancelation',{
                    url: '/cancelation/:id',
                    templateUrl: 'djs/templates/cancelations/show.html',
                    controller: 'CancelationsController'
                })
                .state('edit_cancelation',{
                    url: '/cancelation/:id/edit',
                    templateUrl: 'djs/templates/cancelations/form.html',
                    controller: 'CancelationsController'
                })
                .state('cancelations',{
                    url: '/cancelations',
                    templateUrl: 'djs/templates/cancelations/index.html',
                    controller: 'CancelationsController'
                })
                .state('new_event_category',{
                    url: '/event_category/new',
                    templateUrl: 'djs/templates/event_categories/form.html',
                    controller: 'EventCategoriesController'
                })
                .state('show_event_category',{
                    url: '/event_category/:id',
                    templateUrl: 'djs/templates/event_categories/show.html',
                    controller: 'EventCategoriesController'
                })
                .state('edit_event_category',{
                    url: '/event_category/:id/edit',
                    templateUrl: 'djs/templates/event_categories/form.html',
                    controller: 'EventCategoriesController'
                })
                .state('event_categories',{
                    url: '/event_categories',
                    templateUrl: 'djs/templates/event_categories/index.html',
                    controller: 'EventCategoriesController'
                })
                .state('new_equipment',{
                    url: '/equipment/new',
                    templateUrl: 'djs/templates/equipments/form.html',
                    controller: 'EquipmentsController'
                })
                .state('show_equipment',{
                    url: '/equipment/:id',
                    templateUrl: 'djs/templates/equipments/show.html',
                    controller: 'EquipmentsController'
                })
                .state('edit_equipment',{
                    url: '/equipment/:id/edit',
                    templateUrl: 'djs/templates/equipments/form.html',
                    controller: 'EquipmentsController'
                })
                .state('equipments',{
                    url: '/equipments',
                    templateUrl: 'djs/templates/equipments/index.html',
                    controller: 'EquipmentsController'
                })
                .state('new_who_we_are_page',{
                    url: '/who_we_are_page/new',
                    templateUrl: 'djs/templates/who_we_are_pages/form.html',
                    controller: 'WhoWeArePagesController'
                })
                .state('show_who_we_are_page',{
                    url: '/who_we_are_page/:id',
                    templateUrl: 'djs/templates/who_we_are_pages/show.html',
                    controller: 'WhoWeArePagesController'
                })
                .state('edit_who_we_are_page',{
                    url: '/who_we_are_page/:id/edit',
                    templateUrl: 'djs/templates/who_we_are_pages/form.html',
                    controller: 'WhoWeArePagesController'
                })
                .state('who_we_are_pages',{
                    url: '/who_we_are_pages',
                    templateUrl: 'djs/templates/who_we_are_pages/index.html',
                    controller: 'WhoWeArePagesController'
                })
                .state('new_crew_page',{
                    url: '/crew_page/new',
                    templateUrl: 'djs/templates/crew_pages/form.html',
                    controller: 'CrewPagesController'
                })
                .state('show_crew_page',{
                    url: '/crew_page/:id',
                    templateUrl: 'djs/templates/crew_pages/show.html',
                    controller: 'CrewPagesController'
                })
                .state('edit_crew_page',{
                    url: '/crew_page/:id/edit',
                    templateUrl: 'djs/templates/crew_pages/form.html',
                    controller: 'CrewPagesController'
                })
                .state('crew_pages',{
                    url: '/crew_pages',
                    templateUrl: 'djs/templates/crew_pages/index.html',
                    controller: 'CrewPagesController'
                })
                .state('new_how_we_work_page',{
                    url: '/how_we_work_page/new',
                    templateUrl: 'djs/templates/how_we_work_pages/form.html',
                    controller: 'HowWeWorkPagesController'
                })
                .state('show_how_we_work_page',{
                    url: '/how_we_work_page/:id',
                    templateUrl: 'djs/templates/how_we_work_pages/show.html',
                    controller: 'HowWeWorkPagesController'
                })
                .state('edit_how_we_work_page',{
                    url: '/how_we_work_page/:id/edit',
                    templateUrl: 'djs/templates/how_we_work_pages/form.html',
                    controller: 'HowWeWorkPagesController'
                })
                .state('how_we_work_pages',{
                    url: '/how_we_work_pages',
                    templateUrl: 'djs/templates/how_we_work_pages/index.html',
                    controller: 'HowWeWorkPagesController'
                })
                .state('new_policies_page',{
                    url: '/policies_page/new',
                    templateUrl: 'djs/templates/policies_pages/form.html',
                    controller: 'PoliciesPagesController'
                })
                .state('show_policies_page',{
                    url: '/policies_page/:id',
                    templateUrl: 'djs/templates/policies_pages/show.html',
                    controller: 'PoliciesPagesController'
                })
                .state('edit_policies_page',{
                    url: '/policies_page/:id/edit',
                    templateUrl: 'djs/templates/policies_pages/form.html',
                    controller: 'PoliciesPagesController'
                })
                .state('policies_pages',{
                    url: '/policies_pages',
                    templateUrl: 'djs/templates/policies_pages/index.html',
                    controller: 'PoliciesPagesController'
                })
                .state('new_terms_n_conditions_page',{
                    url: '/terms_n_conditions_page/new',
                    templateUrl: 'djs/templates/terms_n_conditions_pages/form.html',
                    controller: 'TermsNConditionsPagesController'
                })
                .state('show_terms_n_conditions_page',{
                    url: '/terms_n_conditions_page/:id',
                    templateUrl: 'djs/templates/terms_n_conditions_pages/show.html',
                    controller: 'TermsNConditionsPagesController'
                })
                .state('edit_terms_n_conditions_page',{
                    url: '/terms_n_conditions_page/:id/edit',
                    templateUrl: 'djs/templates/terms_n_conditions_pages/form.html',
                    controller: 'TermsNConditionsPagesController'
                })
                .state('terms_n_conditions_pages',{
                    url: '/terms_n_conditions_pages',
                    templateUrl: 'djs/templates/terms_n_conditions_pages/index.html',
                    controller: 'TermsNConditionsPagesController'
                })
                .state('new_cancelations_page',{
                    url: '/cancelations_page/new',
                    templateUrl: 'djs/templates/cancelations_pages/form.html',
                    controller: 'CancelationsPagesController'
                })
                .state('show_cancelations_page',{
                    url: '/cancelations_page/:id',
                    templateUrl: 'djs/templates/cancelations_pages/show.html',
                    controller: 'CancelationsPagesController'
                })
                .state('edit_cancelations_page',{
                    url: '/cancelations_page/:id/edit',
                    templateUrl: 'djs/templates/cancelations_pages/form.html',
                    controller: 'CancelationsPagesController'
                })
                .state('cancelations_pages',{
                    url: '/cancelations_pages',
                    templateUrl: 'djs/templates/cancelations_pages/index.html',
                    controller: 'CancelationsPagesController'
                })
    }]);

    ZurealdjDjApp.run(['$http', '$rootScope', function($http, $rootScope){
        var csrf_token = $('meta[name="csrf-token"]').attr('content');
        $http.defaults.headers.common['X-CSRF-Token'] = csrf_token;
    }]);

}());