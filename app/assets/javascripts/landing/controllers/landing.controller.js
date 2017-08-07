(function () {

    "use strict";

    angular.module('ZurealdjLandingApp')
        .controller('LandingController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce', 'SlidesFactory', 'FavDjsFactory', 'CoursesFactory',
            function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, slides, fav_djs, courses) {

                $scope.slides = [];
                $scope.top_rated_djs = [];
                $scope.instagram_feed = [];

                slides.all().success(function (data) {
                    $scope.slides = data.slides;
                });

                fav_djs.all().success(function (data) {
                    $scope.fav_djs = data.fav_djs;
                });

                courses.all().success(function (data) {
                    $scope.courses = data.courses
                });

            }])
}());