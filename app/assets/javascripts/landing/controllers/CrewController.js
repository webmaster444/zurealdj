(function () {

    "use strict";

    angular.module('ZurealdjLandingApp')
        .controller('CrewController', ['$scope', '$state', '$sce', 'StaticPagesFactory',
            function ($scope, $state, $sce, pages) {
                pages.crew().success(function(data){
                    $scope.page = $sce.trustAsHtml(data.page);
                })
            }])
}());