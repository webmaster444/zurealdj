(function () {

    "use strict";

    angular.module('ZurealdjAdminApp')
        .controller('TermsNConditionsPagesController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce', 'SweetAlert', 'TermsNConditionsPagesFactory',
            function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, SweetAlert, terms_n_conditions_pages) {
                $scope.I18n = I18n;
                $scope._ = _;
                $scope.$state = $state;

                $scope.getHtml = function(html){
                    return $sce.trustAsHtml(html);
                };

                if($state.current.name == 'edit_terms_n_conditions_page'){

                    $scope.terms_n_conditions_page = {};

                    terms_n_conditions_pages.show($stateParams.id)
                        .success(function(data){
                                $timeout(function(){
                                    $scope.terms_n_conditions_page = data.terms_n_conditions_page;
                                }, 0);
                            }
                        );

                    $scope.save = function(){
                        $scope.submitted = true;

                        $scope.formPending = true;
                        terms_n_conditions_pages.upsert($scope.terms_n_conditions_page)
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