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

                flags.all().success(function(data){
                    $scope.flags = data.flags;
                });

                $scope.filters = {
                    per_page: 10
                };

                if($state.current.name == 'policies_pages'){
                    $scope.policies_page = [];

                    var timer = false;
                    $scope.$watch('filters', function(){
                        if(timer){
                            $scope.page = 1;
                            $timeout.cancel(timer)
                        }
                        timer= $timeout(function(){
                            if($scope.page > Math.ceil($scope.count / $scope.filters.per_page)) $scope.page = 1;
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
                                    totalPages: Math.ceil($scope.count / $scope.filters.per_page),
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

