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

            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('home',{
                  url: '/',
                  templateUrl: 'djs/templates/home/index.html',
                  controller: 'DashboardController'
                })
                .state('profile',{
                    url: '/profile',
                    templateUrl: 'djs/templates/users/edit.html',
                    controller: 'UsersController'
                })

                .state('step_event_types',{
                    url: '/event_types_step',
                    templateUrl: 'djs/templates/steps/event_types.html',
                    controller: 'StepEventTypesController'
                })
                .state('step_genres',{
                    url: '/genres_step',
                    templateUrl: 'djs/templates/steps/genres.html',
                    controller: 'StepGenresController'
                })
                .state('step_equipments',{
                    url: '/equipments_step',
                    templateUrl: 'djs/templates/steps/equipments.html',
                    controller: 'StepEquipmentsController'
                })

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

    ZurealdjDjApp.run(['$http', '$rootScope', 'AuthHttp', '$state', function($http, $rootScope, AuthHttp, $state){
        var csrf_token = $('meta[name="csrf-token"]').attr('content');
        $http.defaults.headers.common['X-CSRF-Token'] = csrf_token;

        AuthHttp.setDefaults('notFinishedProfileAction', function(response){
            $state.go('step_' + response.step);
        })
    }]);

}());