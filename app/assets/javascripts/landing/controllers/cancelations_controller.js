(function () {

    "use strict";

    angular.module('ZurealdjLandingApp')
        .controller('CancelationsController', ['$scope', '$state', '$sce', 'StaticPagesFactory',
            function ($scope, $state, $sce, pages) {
                pages.cancelations().success(function(data){
                    $scope.page = $sce.trustAsHtml(data.page);
                })
            }])
}());