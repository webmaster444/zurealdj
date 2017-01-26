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
                .state('show_event',{
                    url: '/events/:id',
                    templateUrl: 'djs/templates/events/show.html',
                    controller: 'EventsController'
                })
                .state('events',{
                    url: '/events',
                    templateUrl: 'djs/templates/events/index.html',
                    controller: 'EventsController'
                })
                .state('settings',{
                    url: '/settings',
                    templateUrl: 'djs/templates/settings/edit.html',
                    controller: 'SettingsController'
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