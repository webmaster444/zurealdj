(function () {

    "use strict";

    angular.module('ZurealdjLandingApp')
        .controller('WhoWeAreController', ['$scope', '$state', '$sce', 'StaticPagesFactory',
            function ($scope, $state, $sce, pages) {
                pages.who_we_are().success(function(data){
                    $scope.page = $sce.trustAsHtml(data.page);
                })
            }])
}());