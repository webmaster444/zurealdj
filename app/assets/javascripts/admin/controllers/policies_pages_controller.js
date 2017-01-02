(function() {

    "use strict";

    angular.module('ZurealdjAdminApp')
        .controller('PoliciesPagesController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce', 'SweetAlert', 'PoliciesPagesFactory',
            function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, SweetAlert, policies_pages) {
                $scope.I18n = I18n;
                $scope._ = _;
                $scope.$state = $state;

                $scope.getHtml = function(html){
                    return $sce.trustAsHtml(html);
                };

                if($state.current.name == 'edit_policies_page'){

                    $scope.policies_page = {};

                    policies_pages.show($stateParams.id)
                        .success(function(data){
                                $timeout(function(){
                                    $scope.policies_page = data.policies_page;
                                }, 0);
                            }
                        );

                    $scope.save = function(){
                        $scope.submitted = true;

                        $scope.formPending = true;
                        policies_pages.upsert($scope.policies_page)
                            .success(function(){
                                $scope.formPending = false;
                                $state.go('home')
                            })
                            .error(function(data){
                                $scope.validation_errors = data.errors;
                                $scope.formPending = false;
                            })
                    };
                }
            }])

}());

