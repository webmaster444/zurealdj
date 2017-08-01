(function () {

    "use strict";

    angular.module('ZurealdjLandingApp')
        .controller('LandingController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce', 'SlidesFactory', 'TopRatedDjsFactory', 'InstagramFactory',
            function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, slides, top_rated_djs, instagram) {

                $scope.slides = [];
                $scope.top_rated_djs = [];
                $scope.instagram_feed = [];

                slides.all().success(function (data) {
                    $scope.slides = data.slides;
                });

                top_rated_djs.all().success(function (data) {
                    $scope.top_rated_djs = data.top_djs;
                });

                instagram.all().success(function (data) {
                    $scope.instagram_feed = data.last_images;
                    $scope.instagram_feed_count = data.last_images.length;
                });


            }])
}());