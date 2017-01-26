(function () {

    "use strict";

    angular.module('ZurealdjLandingApp')
        .controller('CancellationPolicyController', ['$scope', '$state', '$sce', 'StaticPagesFactory',
            function ($scope, $state, $sce, pages) {
                pages.cancellation_policy().success(function(data){
                    $scope.page = $sce.trustAsHtml(data.page);
                })
            }])
}());