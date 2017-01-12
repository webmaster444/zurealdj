(function () {

    "use strict";

    angular.module('ZurealdjLandingApp')
        .controller('HowWeWorkController', ['$scope', '$state', '$sce', 'StaticPagesFactory',
            function ($scope, $state, $sce, pages) {
                pages.how_we_work().success(function(data){
                    $scope.page = $sce.trustAsHtml(data.page);
                })
            }])
}());