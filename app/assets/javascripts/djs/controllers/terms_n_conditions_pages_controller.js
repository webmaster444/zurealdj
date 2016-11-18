(function () {

    "use strict";

    angular.module('ZurealdjApp')
        .controller('TermsNConditionsPagesController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce', 'SweetAlert', 'TermsNConditionsPagesFactory', 'CountryFlagsFactory',
            function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, SweetAlert, terms_n_conditions_pages, flags) {
                $scope.I18n = I18n;
                $scope._ = _;
                $scope.$state = $state;

                $scope.getHtml = function(html){
                    return $sce.trustAsHtml(html);
                };


                $scope.filters = {};

                if($state.current.name == 'terms_n_conditions_pages'){
                    $scope.terms_n_conditions_page = [];

                    var timer = false;
                    $scope.$watch('filters', function(){
                        if(timer){
                            $timeout.cancel(timer)
                        }
                        timer= $timeout(function(){
                            $scope.retrieveTermsNConditionsPages();
                        }, 500)
                    }, true);

                    $scope.page = 1;
                    $scope.retrieveTermsNConditionsPages = function(){
                        terms_n_conditions_pages.all({page: $scope.page, query: $scope.filters}).success(function (data) {
                            $scope.terms_n_conditions_pages = data.terms_n_conditions_pages;
                            $scope.count = data.count;

                            var pagination = $('#terms_n_conditions_pages-pagination');
                            pagination.empty();
                            pagination.removeData('twbs-pagination');
                            pagination.unbind('page');

                            if($scope.count > 0){
                                pagination.twbsPagination({
                                    totalPages: Math.ceil($scope.count / 9),
                                    startPage: $scope.page,
                                    visiblePages: 9,
                                    onPageClick: function (event, page) {
                                        $scope.page = page;
                                        $scope.retrieveTermsNConditionsPages();
                                    }
                                })
                            }
                        }).error(function (data) {

                        });
                    };

                    $scope.retrieveTermsNConditionsPages();
                }

                $scope.destroy = function(id){
                    var scope = $scope;
                    SweetAlert.swal({
                            title: "Are you sure?",
                            text: "Your will not be able to recover this terms_n_conditions_page!",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
                            cancelButtonText: "No, cancel plx!",
                            closeOnConfirm: true,
                            closeOnCancel: true,
                            allowOutsideClick: true },
                        function(isConfirm){
                            if (isConfirm) {
                                terms_n_conditions_pages.destroy(id).success(function(){
                                    $scope.retrieveTermsNConditionsPages();
                                });
                            } else {

                            }
                        }
                    );
                };

                if($state.current.name == 'new_terms_n_conditions_page' || $state.current.name == 'edit_terms_n_conditions_page'){

                    $scope.terms_n_conditions_page = {};


                    if($state.current.name == 'edit_terms_n_conditions_page'){
                        terms_n_conditions_pages.show($stateParams.id)
                            .success(function(data){
                                $timeout(function(){
                                    $scope.terms_n_conditions_page = data.terms_n_conditions_page;
                                }, 0);
                            }
                        )
                    }

                    $scope.submitTermsNConditionsPage = function(){
                        $scope.submitted = true;
                        if($scope.TermsNConditionsPageForm.$invalid ){
                            return false;
                        }

                        $scope.formPending = true;
                        terms_n_conditions_pages.upsert($scope.terms_n_conditions_page)
                            .success(function(){
                                $scope.formPending = false;
                                $state.go('terms_n_conditions_pages')
                            })
                            .error(function(data){
                                $scope.validation_errors = data.errors;
                                $scope.formPending = false;
                            })
                    };
                }

                if($state.current.name == 'show_terms_n_conditions_page'){
                    terms_n_conditions_pages.show($stateParams.id).success(function(data){
                        $scope.terms_n_conditions_page = data.terms_n_conditions_page;

                    });
                }
            }])

}());