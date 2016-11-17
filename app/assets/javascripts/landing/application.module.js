(function () {
    "use strict";
    var ZurealdjLandingApp = angular.module('ZurealdjLandingApp', [
        'ui.router',
        'templates',
        'ngDialog',
        'validation.match',
        'validation.email',
        'fileread',
        'ui.bootstrap',
        'bootstrapLightbox',
        'formInput.images',
        'formInput.image',
        'toaster',
        'AuthHttp'
    ]);

    ZurealdjLandingApp.config(['$urlRouterProvider', '$stateProvider', '$httpProvider',
        function ($urlRouterProvider, $stateProvider, $httpProvider) {

            $httpProvider.defaults.headers.common['X-Requested-With'] = 'AngularXMLHttpRequest';

            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('home',{
                  url: '/',
                  templateUrl: 'landing/templates/home/index.html',
                  controller: 'HomeController'
                })
                .state('login',{
                  url: '/login',
                  templateUrl: 'landing/templates/sessions/new.html',
                  controller: 'SessionsController'
                })
                .state('forgot_password',{
                  url: '/forgot_password',
                  templateUrl: 'landing/templates/passwords/new.html',
                  controller: 'PasswordsController'
                })
                .state('register',{
                  url: '/register',
                  templateUrl: 'landing/templates/users/new.html',
                  controller: 'UsersController'
                });
    }]);

    ZurealdjLandingApp.run(['$http', '$rootScope', function($http, $rootScope){
        var csrf_token = $('meta[name="csrf-token"]').attr('content');
        $http.defaults.headers.common['X-CSRF-Token'] = csrf_token;
    }]);

}());