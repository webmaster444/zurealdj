(function () {

    "use strict";

    angular.module('ZurealdjLandingApp')
        .controller('LandingController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce', 'SlidesFactory', 'TopRatedDjsFactory',
            function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, slides, top_rated_djs) {

                $scope.slides = [];
                $scope.top_rated_djs = [];
                slides.all().success(function (data) {
                    $scope.slides = data.slides;
                });

                top_rated_djs.all().success(function (data) {
                    $scope.top_rated_djs = data.top_djs;
                });


            }])
}());