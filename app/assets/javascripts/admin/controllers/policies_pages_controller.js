(function () {

    "use strict";

    angular.module('ZurealdjAdminApp')
        .controller('PoliciesPagesController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce', 'SweetAlert', 'PoliciesPagesFactory', 'CountryFlagsFactory',
            function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, SweetAlert, policies_pages, flags) {
                $scope.I18n = I18n;
                $scope._ = _;
                $scope.$state = $state;

                $scope.getHtml = function(html){
                    return $sce.trustAsHtml(html);
                };


                $scope.filters = {};

                if($state.current.name == 'policies_pages'){
                    $scope.policies_page = [];

                    var timer = false;
                    $scope.$watch('filters', function(){
                        if(timer){
                            $timeout.cancel(timer)
                        }
                        timer= $timeout(function(){
                            $scope.retrievePoliciesPages();
                        }, 500)
                    }, true);

                    $scope.page = 1;
                    $scope.retrievePoliciesPages = function(){
                        policies_pages.all({page: $scope.page, query: $scope.filters}).success(function (data) {
                            $scope.policies_pages = data.policies_pages;
                            $scope.count = data.count;

                            var pagination = $('#policies_pages-pagination');
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
                                        $scope.retrievePoliciesPages();
                                    }
                                })
                            }
                        }).error(function (data) {

                        });
                    };

                    $scope.retrievePoliciesPages();
                }

                $scope.destroy = function(id){
                    var scope = $scope;
                    SweetAlert.swal({
                            title: "Are you sure?",
                            text: "Your will not be able to recover this policies_page!",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
                            cancelButtonText: "No, cancel plx!",
                            closeOnConfirm: true,
                            closeOnCancel: true,
                            allowOutsideClick: true },
                        function(isConfirm){
                            if (isConfirm) {
                                policies_pages.destroy(id).success(function(){
                                    $scope.retrievePoliciesPages();
                                });
                            } else {

                            }
                        }
                    );
                };

                if($state.current.name == 'new_policies_page' || $state.current.name == 'edit_policies_page'){

                    $scope.policies_page = {};


                    if($state.current.name == 'edit_policies_page'){
                        policies_pages.show($stateParams.id)
                            .success(function(data){
                                $timeout(function(){
                                    $scope.policies_page = data.policies_page;
                                }, 0);
                            }
                        )
                    }

                    $scope.submitPoliciesPage = function(){
                        $scope.submitted = true;
                        if($scope.PoliciesPageForm.$invalid ){
                            return false;
                        }

                        $scope.formPending = true;
                        policies_pages.upsert($scope.policies_page)
                            .success(function(){
                                $scope.formPending = false;
                                $state.go('policies_pages')
                            })
                            .error(function(data){
                                $scope.validation_errors = data.errors;
                                $scope.formPending = false;
                            })
                    };
                }

                if($state.current.name == 'show_policies_page'){
                    policies_pages.show($stateParams.id).success(function(data){
                        $scope.policies_page = data.policies_page;

                    });
                }
            }])

}());