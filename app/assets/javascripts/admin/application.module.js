(function () {
    "use strict";
    var ZurealdjAdminApp = angular.module('ZurealdjAdminApp', [
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
        'formInput.country',
        'tablesort',
        'toaster',
        'angular-ladda',
        'AuthHttp',
        'oitozero.ngSweetAlert'
    ]);

    ZurealdjAdminApp.config(['$urlRouterProvider', '$stateProvider', '$httpProvider',
        function ($urlRouterProvider, $stateProvider, $httpProvider) {

            $httpProvider.defaults.headers.common['X-Requested-With'] = 'AngularXMLHttpRequest';

            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('home',{
                  url: '/',
                  templateUrl: 'admin/templates/home/index.html',
                  controller: 'HomeController'
                })
                .state('profile',{
                    url: '/profile',
                    templateUrl: 'admin/templates/users/edit.html',
                    controller: 'UsersController'
                })
                .state('login',{
                    url: '/login',
                    templateUrl: 'admin/templates/sessions/login.html',
                    controller: 'SessionsController'
                })
                .state('edit_organizer',{
                    url: '/organizer/:id/edit',
                    templateUrl: 'admin/templates/organizers/form.html',
                    controller: 'OrganizersController'
                })
                .state('organizers',{
                    url: '/organizers',
                    templateUrl: 'admin/templates/organizers/index.html',
                    controller: 'OrganizersController'
                })
                .state('show_dj',{
                    url: '/dj/:id',
                    templateUrl: 'admin/templates/djs/show.html',
                    controller: 'DjsController'
                })
                .state('edit_dj',{
                    url: '/dj/:id/edit',
                    templateUrl: 'admin/templates/djs/form.html',
                    controller: 'DjsController'
                })
                .state('djs',{
                    url: '/djs',
                    templateUrl: 'admin/templates/djs/index.html',
                    controller: 'DjsController'
                })
                .state('new_booking',{
                    url: '/booking/new',
                    templateUrl: 'admin/templates/bookings/form.html',
                    controller: 'BookingsController'
                })
                .state('show_booking',{
                    url: '/booking/:id',
                    templateUrl: 'admin/templates/bookings/show.html',
                    controller: 'BookingsController'
                })
                .state('edit_booking',{
                    url: '/booking/:id/edit',
                    templateUrl: 'admin/templates/bookings/form.html',
                    controller: 'BookingsController'
                })
                .state('bookings',{
                    url: '/bookings',
                    templateUrl: 'admin/templates/bookings/index.html',
                    controller: 'BookingsController'
                })
                .state('new_event',{
                    url: '/event/new',
                    templateUrl: 'admin/templates/events/form.html',
                    controller: 'EventsController'
                })
                .state('show_event',{
                    url: '/event/:id',
                    templateUrl: 'admin/templates/events/show.html',
                    controller: 'EventsController'
                })
                .state('edit_event',{
                    url: '/event/:id/edit',
                    templateUrl: 'admin/templates/events/form.html',
                    controller: 'EventsController'
                })
                .state('events',{
                    url: '/events',
                    templateUrl: 'admin/templates/events/index.html',
                    controller: 'EventsController'
                })
                .state('new_genre',{
                    url: '/genre/new',
                    templateUrl: 'admin/templates/genres/form.html',
                    controller: 'GenresController'
                })
                .state('edit_genre',{
                    url: '/genre/:id/edit',
                    templateUrl: 'admin/templates/genres/form.html',
                    controller: 'GenresController'
                })
                .state('genres',{
                    url: '/genres',
                    templateUrl: 'admin/templates/genres/index.html',
                    controller: 'GenresController'
                })
                .state('new_cancelation',{
                    url: '/cancelation/new',
                    templateUrl: 'admin/templates/cancelations/form.html',
                    controller: 'CancelationsController'
                })
                .state('edit_cancelation',{
                    url: '/cancelation/:id/edit',
                    templateUrl: 'admin/templates/cancelations/form.html',
                    controller: 'CancelationsController'
                })
                .state('cancelations',{
                    url: '/cancelations',
                    templateUrl: 'admin/templates/cancelations/index.html',
                    controller: 'CancelationsController'
                })
                .state('new_event_category',{
                    url: '/event_category/new',
                    templateUrl: 'admin/templates/event_categories/form.html',
                    controller: 'EventCategoriesController'
                })
                .state('edit_event_category',{
                    url: '/event_category/:id/edit',
                    templateUrl: 'admin/templates/event_categories/form.html',
                    controller: 'EventCategoriesController'
                })
                .state('event_categories',{
                    url: '/event_categories',
                    templateUrl: 'admin/templates/event_categories/index.html',
                    controller: 'EventCategoriesController'
                })
                .state('new_equipment',{
                    url: '/equipment/new',
                    templateUrl: 'admin/templates/equipments/form.html',
                    controller: 'EquipmentsController'
                })
                .state('edit_equipment',{
                    url: '/equipment/:id/edit',
                    templateUrl: 'admin/templates/equipments/form.html',
                    controller: 'EquipmentsController'
                })
                .state('equipments',{
                    url: '/equipments',
                    templateUrl: 'admin/templates/equipments/index.html',
                    controller: 'EquipmentsController'
                })
                .state('edit_who_we_are_page',{
                    url: '/who_we_are_page/edit',
                    templateUrl: 'admin/templates/who_we_are_pages/form.html',
                    controller: 'WhoWeArePagesController'
                })
                .state('edit_crew_page',{
                    url: '/crew_page/edit',
                    templateUrl: 'admin/templates/crew_pages/form.html',
                    controller: 'CrewPagesController'
                })
                .state('edit_how_we_work_page',{
                    url: '/how_we_work_page/edit',
                    templateUrl: 'admin/templates/how_we_work_pages/form.html',
                    controller: 'HowWeWorkPagesController'
                })
                .state('edit_policies_page',{
                    url: '/policies_page/edit',
                    templateUrl: 'admin/templates/policies_pages/form.html',
                    controller: 'PoliciesPagesController'
                })
                .state('edit_terms_n_conditions_page',{
                    url: '/terms_n_conditions_page/edit',
                    templateUrl: 'admin/templates/terms_n_conditions_pages/form.html',
                    controller: 'TermsNConditionsPagesController'
                })
                .state('edit_cancelations_page',{
                    url: '/cancelations_page/edit',
                    templateUrl: 'admin/templates/cancelations_pages/form.html',
                    controller: 'CancelationsPagesController'
                })
                .state('email_sender',{
                    url: '/email_sender',
                    templateUrl: 'admin/templates/email_sender/form.html',
                    controller: 'EmailSenderController'
                })
                .state('forgot_password',{
                    url: '/forgot_password',
                    templateUrl: 'admin/templates/passwords/new.html',
                    controller: 'PasswordsController'
                })
                .state('restore_password',{
                    url: '/restore_password',
                    templateUrl: 'admin/templates/passwords/restore.html',
                    controller: 'PasswordsController'
                });
    }]);

    ZurealdjAdminApp.run(['$http', '$rootScope', 'AuthHttp', '$state', '$timeout', function($http, $rootScope, AuthHttp, $state, $timeout){
        var csrf_token = $('meta[name="csrf-token"]').attr('content');
        $http.defaults.headers.common['X-CSRF-Token'] = csrf_token;

        AuthHttp.setDefaults('unauthorizedAction', function(){
            $state.go('login');
            $timeout(function(){
                $('body').addClass('mini-navbar');
                $('body').removeClass('body-small');
            });
        })
    }]);

}());