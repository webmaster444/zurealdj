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
        'ngAnimate',
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
                  controller: 'LandingController'
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
                .state('pricing',{
                    url: '/pricing',
                    templateUrl: 'landing/templates/pricing/index.html',
                    controller: 'PricingController'
                })
                .state('static_pages',{
                    url: '/:page_name',
                    templateUrl: 'landing/templates/static_pages/index.html',
                    controller: 'StaticPagesController'
                })
    }]);

    ZurealdjLandingApp.run(['$http', '$rootScope', 'AuthHttp', function($http, $rootScope, AuthHttp){
        var csrf_token = $('meta[name="csrf-token"]').attr('content');
        $http.defaults.headers.common['X-CSRF-Token'] = csrf_token;

        $rootScope.$on('ngDialog.opened', function (e) {
            if (window.navigator.userAgent.match(/iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile/i) && window.screen.width < 750) {
                $(".zdj-ngdialog").css({"background-color": "#fff", "margin": 0, "padding": 0});
                $(".ngdialog-overlay").css({"display": "none"});
            }
            $(".ngdialog-close").css({"display": "none"});
            window.onresize();
        });

        AuthHttp.setDefaults('unauthorizedAction', function(){})
    }]);

}());