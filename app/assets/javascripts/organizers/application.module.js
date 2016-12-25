(function () {
    "use strict";
    var ZurealdjOrganizerApp = angular.module('ZurealdjOrganizerApp', [
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

    ZurealdjOrganizerApp.config(['$urlRouterProvider', '$stateProvider', '$httpProvider',
        function ($urlRouterProvider, $stateProvider, $httpProvider) {

            $httpProvider.defaults.headers.common['X-Requested-With'] = 'AngularXMLHttpRequest';

            $urlRouterProvider.otherwise('djs');

            $stateProvider
                .state('profile',{
                    url: '/profile',
                    templateUrl: 'organizers/templates/users/edit.html',
                    controller: 'UsersController'
                })
                .state('step_event_types',{
                    url: '/event_types_step',
                    templateUrl: 'organizers/templates/steps/event_types.html',
                    controller: 'StepEventTypesController'
                })
                .state('step_genres',{
                    url: '/genres_step',
                    templateUrl: 'organizers/templates/steps/genres.html',
                    controller: 'StepGenresController'
                })
                .state('step_company_name',{
                    url: '/company_name_step',
                    templateUrl: 'organizers/templates/steps/company_name.html',
                    controller: 'StepCompanyNameController'
                })
                .state('step_personal_url',{
                    url: '/personal_url_step',
                    templateUrl: 'organizers/templates/steps/personal_url.html',
                    controller: 'StepPersonalUrlController'
                })
                .state('djs',{
                    url: '/djs',
                    templateUrl: 'organizers/templates/djs/index.html',
                    controller: 'DjsController'
                })

                .state('new_booking',{
                    url: '/booking/new',
                    templateUrl: 'organizers/templates/bookings/form.html',
                    controller: 'BookingsController'
                })
                .state('show_booking',{
                    url: '/booking/:id',
                    templateUrl: 'organizers/templates/bookings/show.html',
                    controller: 'BookingsController'
                })
                .state('edit_booking',{
                    url: '/booking/:id/edit',
                    templateUrl: 'organizers/templates/bookings/form.html',
                    controller: 'BookingsController'
                })
                .state('bookings',{
                    url: '/bookings',
                    templateUrl: 'organizers/templates/bookings/index.html',
                    controller: 'BookingsController'
                })
                .state('new_event',{
                    url: '/event/new',
                    templateUrl: 'organizers/templates/events/form.html',
                    controller: 'EventsController'
                })
                .state('show_event',{
                    url: '/event/:id',
                    templateUrl: 'organizers/templates/events/show.html',
                    controller: 'EventsController'
                })
                .state('edit_event',{
                    url: '/event/:id/edit',
                    templateUrl: 'organizers/templates/events/form.html',
                    controller: 'EventsController'
                })
                .state('events',{
                    url: '/events',
                    templateUrl: 'organizers/templates/events/index.html',
                    controller: 'EventsController'
                })
                .state('new_genre',{
                    url: '/genre/new',
                    templateUrl: 'organizers/templates/genres/form.html',
                    controller: 'GenresController'
                })
                .state('show_genre',{
                    url: '/genre/:id',
                    templateUrl: 'organizers/templates/genres/show.html',
                    controller: 'GenresController'
                })
                .state('edit_genre',{
                    url: '/genre/:id/edit',
                    templateUrl: 'organizers/templates/genres/form.html',
                    controller: 'GenresController'
                })
                .state('genres',{
                    url: '/genres',
                    templateUrl: 'organizers/templates/genres/index.html',
                    controller: 'GenresController'
                })
                .state('new_cancelation',{
                    url: '/cancelation/new',
                    templateUrl: 'organizers/templates/cancelations/form.html',
                    controller: 'CancelationsController'
                })
                .state('show_cancelation',{
                    url: '/cancelation/:id',
                    templateUrl: 'organizers/templates/cancelations/show.html',
                    controller: 'CancelationsController'
                })
                .state('edit_cancelation',{
                    url: '/cancelation/:id/edit',
                    templateUrl: 'organizers/templates/cancelations/form.html',
                    controller: 'CancelationsController'
                })
                .state('cancelations',{
                    url: '/cancelations',
                    templateUrl: 'organizers/templates/cancelations/index.html',
                    controller: 'CancelationsController'
                })
                .state('new_event_category',{
                    url: '/event_category/new',
                    templateUrl: 'organizers/templates/event_categories/form.html',
                    controller: 'EventCategoriesController'
                })
                .state('show_event_category',{
                    url: '/event_category/:id',
                    templateUrl: 'organizers/templates/event_categories/show.html',
                    controller: 'EventCategoriesController'
                })
                .state('edit_event_category',{
                    url: '/event_category/:id/edit',
                    templateUrl: 'organizers/templates/event_categories/form.html',
                    controller: 'EventCategoriesController'
                })
                .state('event_categories',{
                    url: '/event_categories',
                    templateUrl: 'organizers/templates/event_categories/index.html',
                    controller: 'EventCategoriesController'
                })
                .state('new_equipment',{
                    url: '/equipment/new',
                    templateUrl: 'organizers/templates/equipments/form.html',
                    controller: 'EquipmentsController'
                })
                .state('show_equipment',{
                    url: '/equipment/:id',
                    templateUrl: 'organizers/templates/equipments/show.html',
                    controller: 'EquipmentsController'
                })
                .state('edit_equipment',{
                    url: '/equipment/:id/edit',
                    templateUrl: 'organizers/templates/equipments/form.html',
                    controller: 'EquipmentsController'
                })
                .state('equipments',{
                    url: '/equipments',
                    templateUrl: 'organizers/templates/equipments/index.html',
                    controller: 'EquipmentsController'
                })
    }]);

    ZurealdjOrganizerApp.run(['$http', '$rootScope', '$state', 'AuthHttp', function($http, $rootScope, $state, AuthHttp){
        var csrf_token = $('meta[name="csrf-token"]').attr('content');
        $http.defaults.headers.common['X-CSRF-Token'] = csrf_token;

        AuthHttp.setDefaults('notFinishedProfileAction', function(response){
            $state.go('step_' + response.step);
        })
    }]);

}());