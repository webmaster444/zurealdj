(function () {

    "use strict";

    angular.module('ZurealdjLandingApp')
        .controller('PoliciesController', ['$scope', '$state', '$sce', 'StaticPagesFactory',
            function ($scope, $state, $sce, pages) {
                pages.policies().success(function(data){
                    $scope.page = $sce.trustAsHtml(data.page);
                })
            }])
}());