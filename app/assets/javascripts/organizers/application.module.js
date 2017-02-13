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
        'oitozero.ngSweetAlert',
        'rzModule',
        'ngAudio',
        'ui.select',
        'formInput.timepicker',
        'angular.filter',
        'ngAnimate',
        'dj.scroll',
        'countPicker'
    ]);

    ZurealdjOrganizerApp.config(['$urlRouterProvider', '$stateProvider', '$httpProvider',
        function ($urlRouterProvider, $stateProvider, $httpProvider) {

            $httpProvider.defaults.headers.common['X-Requested-With'] = 'AngularXMLHttpRequest';

            $urlRouterProvider.otherwise('djs');

            $stateProvider
                .state('profile',{
                    url: '/profile',
                    templateUrl: 'organizers/templates/users/profile.html',
                    controller: 'UsersController'
                })
                .state('edit_profile',{
                    url: '/edit_profile',
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
                .state('dj',{
                    url: '/djs/:id',
                    templateUrl: 'organizers/templates/djs/show.html',
                    controller: 'DjsController'
                })
                .state('event',{
                    url: '/events/:id',
                    templateUrl: 'organizers/templates/events/show.html',
                    controller: 'EventsController'
                })
                .state('events',{
                    url: '/events',
                    templateUrl: 'organizers/templates/events/index.html',
                    controller: 'EventsController'
                })
                .state('favorites',{
                    url: '/favorites',
                    templateUrl: 'organizers/templates/favorites/index.html',
                    controller: 'FavoritesController'
                })
                .state('settings',{
                    url: '/settings',
                    templateUrl: 'organizers/templates/settings/edit.html',
                    controller: 'SettingsController'
                })
                .state('notifications',{
                    url: '/notifications',
                    templateUrl: 'organizers/templates/notifications/index.html',
                    controller: 'NotificationsController'
                })
                .state('messages', {
                    url: '/messages',
                    templateUrl: 'organizers/templates/messages/index.html',
                    controller: 'MessagesController'
                })
                .state('pricing',{
                    url: '/pricing',
                    templateUrl: 'organizers/templates/pricing/index.html',
                    controller: 'PricingController'
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