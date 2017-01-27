(function () {

    "use strict";

    angular.module('ZurealdjLandingApp')
        .controller('LandingController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce', 'SlidesFactory',
            function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, slides) {

                $scope.slides = [];

                slides.all().success(function (data) {
                    $scope.slides = data.slides;
                });
            }])
}());