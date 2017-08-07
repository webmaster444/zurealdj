(function () {
    "use strict";
    var ZurealdjAdminApp = angular.module('ZurealdjAdminApp', [
        'ui.router',
        'templates',
        'ngDialog',
        'validation.match',
        'validation.email',
        'ui.bootstrap',
        'ui-rangeSlider',
        'redactor',
        'formInput.images',
        'formInput.image',
        'formInput.country',
        'tablesort',
        'toaster',
        'angular-ladda',
        'AuthHttp',
        'oitozero.ngSweetAlert',
        'price-format',
        'pagination',
        'dndLists'
    ]);

    ZurealdjAdminApp.config(['$urlRouterProvider', '$stateProvider', '$httpProvider',
        function ($urlRouterProvider, $stateProvider, $httpProvider) {

            $httpProvider.defaults.headers.common['X-Requested-With'] = 'AngularXMLHttpRequest';

            $urlRouterProvider.otherwise('organizers');

            $stateProvider
                .state('profile',{
                    url: '/profile',
                    templateUrl: 'admin/templates/users/edit.html',
                    controller: 'UsersController'
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
                .state('show_event',{
                    url: '/event/:id',
                    templateUrl: 'admin/templates/events/show.html',
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
                .state('new_about_slide',{
                    url: '/about_slides/new',
                    templateUrl: 'admin/templates/about_slides/form.html',
                    controller: 'AboutSlidesController'
                })
                .state('edit_about_slide',{
                    url: '/about_slides/:id/edit',
                    templateUrl: 'admin/templates/about_slides/form.html',
                    controller: 'AboutSlidesController'
                })
                .state('about_slides',{
                    url: '/about_slides',
                    templateUrl: 'admin/templates/about_slides/index.html',
                    controller: 'AboutSlidesController'
                })
                .state('new_subscription',{
                    url: '/subscriptions/new',
                    templateUrl: 'admin/templates/subscriptions/form.html',
                    controller: 'SubscriptionsController'
                })
                .state('edit_subscription',{
                    url: '/subscriptions/:id/edit',
                    templateUrl: 'admin/templates/subscriptions/form.html',
                    controller: 'SubscriptionsController'
                })
                .state('subscriptions',{
                    url: '/subscriptions',
                    templateUrl: 'admin/templates/subscriptions/index.html',
                    controller: 'SubscriptionsController'
                })
                .state('admins',{
                    url: '/admins',
                    templateUrl: 'admin/templates/admins/index.html',
                    controller: 'AdminsController'
                })
                .state('new_admin',{
                    url: '/admin/new',
                    templateUrl: 'admin/templates/admins/form.html',
                    controller: 'AdminsController'
                })
                .state('edit_contact_us_page',{
                    url: '/contact_us_page/edit',
                    templateUrl: 'admin/templates/contact_us_page/form.html',
                    controller: 'ContactUsPagesController'
                })
                .state('edit_help_center_page',{
                    url: '/help_center_page/edit',
                    templateUrl: 'admin/templates/help_center_page/form.html',
                    controller: 'HelpCenterPagesController'
                })
                .state('edit_courses_page',{
                    url: '/courses_page/edit',
                    templateUrl: 'admin/templates/courses_page/form.html',
                    controller: 'CoursePagesController'
                })
                .state('new_course',{
                    url: '/course/new',
                    templateUrl: 'admin/templates/courses/form.html',
                    controller: 'CoursesController'
                })
                .state('edit_course',{
                    url: '/course/:id/edit',
                    templateUrl: 'admin/templates/courses/form.html',
                    controller: 'CoursesController'
                })
                .state('courses',{
                    url: '/courses',
                    templateUrl: 'admin/templates/courses/index.html',
                    controller: 'CoursesController'
                })
                .state('new_fav_dj',{
                    url: '/fav_dj/new',
                    templateUrl: 'admin/templates/fav_djs/form.html',
                    controller: 'FavDjsController'
                })
                .state('edit_fav_dj',{
                    url: '/fav_dj/:id/edit',
                    templateUrl: 'admin/templates/fav_djs/form.html',
                    controller: 'FavDjsController'
                })
                .state('fav_djs',{
                    url: '/fav_djs',
                    templateUrl: 'admin/templates/fav_djs/index.html',
                    controller: 'FavDjsController'
                });
    }]);

    ZurealdjAdminApp.run(['$http', '$rootScope', 'AuthHttp', '$state', '$timeout', function($http, $rootScope, AuthHttp, $state, $timeout){
        var csrf_token = $('meta[name="csrf-token"]').attr('content');
        $http.defaults.headers.common['X-CSRF-Token'] = csrf_token;

        AuthHttp.setDefaults('unauthorizedAction', function(){
            window.location = '/';
        })
    }]);

}());