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
                .state('terms_n_conditions',{
                    url: '/terms_n_conditions',
                    templateUrl: 'landing/templates/terms_n_conditions/index.html',
                    controller: 'TermsNConditionsController'
                })
                .state('crew',{
                    url: '/crew',
                    templateUrl: 'landing/templates/crew/index.html',
                    controller: 'CrewController'
                })
                .state('how_we_work',{
                    url: '/how_we_work',
                    templateUrl: 'landing/templates/how_we_work/index.html',
                    controller: 'HowWeWorkController'
                })
                .state('who_we_are',{
                    url: '/who_we_are',
                    templateUrl: 'landing/templates/who_we_are/index.html',
                    controller: 'WhoWeAreController'
                })
                .state('cancelations',{
                    url: '/cancelations',
                    templateUrl: 'landing/templates/cancelations/index.html',
                    controller: 'CancelationsController'
                })
                .state('policies',{
                    url: '/policies',
                    templateUrl: 'landing/templates/policies/index.html',
                    controller: 'PoliciesController'
                })
    }]);

    ZurealdjLandingApp.run(['$http', '$rootScope', 'AuthHttp', function($http, $rootScope, AuthHttp){
        var csrf_token = $('meta[name="csrf-token"]').attr('content');
        $http.defaults.headers.common['X-CSRF-Token'] = csrf_token;

        $rootScope.$on('ngDialog.opened', function (e) {
            if (window.navigator.userAgent.match(/iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile/i)) {
                $(".zdj-ngdialog").css({"background-color": "#fff", "margin": 0, "padding": 0});
                $(".ngdialog-overlay").css({"display": "none"});
            }
            $(".ngdialog-close").css({"display": "none"});
            window.onresize();
        });

        AuthHttp.setDefaults('unauthorizedAction', function(){})
    }]);

}());