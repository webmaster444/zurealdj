(function () {

    "use strict";

    angular.module('ZurealdjLandingApp')
        .controller('StaticPagesController', ['$scope', '$state', '$sce', 'StaticPagesFactory', '$stateParams',
        function ($scope, $state, $sce, pages, params) {

            pages.get(params.page_name).success(function(data){
                $scope.page = $sce.trustAsHtml(data.page);
            });
        }])
}());