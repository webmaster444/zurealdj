(function () {
    "use strict";
    var ZurealdjLandingApp = angular.module('ZurealdjLandingApp', [
        'ui.router',
        'ui.bootstrap',
        'templates',
        'ngDialog',
        'validation.match',
        'validation.email',
        'ui.bootstrap',
        'bootstrapLightbox',
        'formInput.images',
        'formInput.image',
        'toaster',
        'angular-ladda',
        'AuthHttp',
        'oitozero.ngSweetAlert'
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
                .state('forgot_password',{
                    url: '/forgot_password',
                    templateUrl: 'landing/templates/passwords/new.html',
                    controller: 'PasswordsController'
                })
                .state('restore_password',{
                    url: '/restore_password/:token',
                    templateUrl: 'landing/templates/home/index.html',
                    controller: 'HomeController'
                })
    }]);

    ZurealdjLandingApp.run(['$http', '$rootScope', function($http, $rootScope){
        var csrf_token = $('meta[name="csrf-token"]').attr('content');
        $http.defaults.headers.common['X-CSRF-Token'] = csrf_token;
    }]);

}());