(function () {

    "use strict";

    angular.module('ZurealdjLandingApp')
        .controller('TermsNConditionsController', ['$scope', '$state', '$sce', 'StaticPagesFactory',
            function ($scope, $state, $sce, pages) {
               pages.terms_n_conditions().success(function(data){
                   $scope.page = $sce.trustAsHtml(data.page);
               })
            }])
}());