(function () {

    "use strict";

    angular.module('ZurealdjLandingApp')
        .controller('LandingController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce', 'SlidesFactory', 'TopRatedDjsFactory', 'CoursesFactory',
            function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, slides, top_rated_djs, courses) {

                $scope.slides = [];
                $scope.top_rated_djs = [];
                $scope.instagram_feed = [];

                slides.all().success(function (data) {
                    $scope.slides = data.slides;
                });

                top_rated_djs.all().success(function (data) {
                    $scope.top_rated_djs = data.top_djs;
                });

                courses.all().success(function (data) {
                    $scope.courses = data.courses
                });

            }])
}());