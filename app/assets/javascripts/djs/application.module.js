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
        'oitozero.ngSweetAlert',
        'rzModule',
        'ngAudio'
    ]);

    ZurealdjDjApp.config(['$urlRouterProvider', '$stateProvider', '$httpProvider',
        function ($urlRouterProvider, $stateProvider, $httpProvider) {

            $httpProvider.defaults.headers.common['X-Requested-With'] = 'AngularXMLHttpRequest';

            $urlRouterProvider.otherwise('profile');

            $stateProvider
                .state('edit_profile',{
                    url: '/edit_profile',
                    templateUrl: 'djs/templates/users/edit.html',
                    controller: 'UsersController'
                })
                .state('profile',{
                    url: '/profile',
                    templateUrl: 'djs/templates/users/profile.html',
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
                .state('step_personal_url',{
                    url: '/personal_url_step',
                    templateUrl: 'djs/templates/steps/personal_url.html',
                    controller: 'StepPersonalUrlController'
                })
                .state('step_cancelations',{
                    url: '/cancelations_step',
                    templateUrl: 'djs/templates/steps/cancelations.html',
                    controller: 'StepCancelationsController'
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
    }]);

    ZurealdjDjApp.run(['$http', '$rootScope', 'AuthHttp', '$state', function($http, $rootScope, AuthHttp, $state){
        var csrf_token = $('meta[name="csrf-token"]').attr('content');
        $http.defaults.headers.common['X-CSRF-Token'] = csrf_token;

        AuthHttp.setDefaults('notFinishedProfileAction', function(response){
            $state.go('step_' + response.step);
        })
    }]);

}());