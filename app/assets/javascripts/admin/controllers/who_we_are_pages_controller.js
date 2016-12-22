(function () {

    "use strict";

    angular.module('ZurealdjAdminApp')
        .controller('WhoWeArePagesController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce', 'SweetAlert', 'WhoWeArePagesFactory', 'CountryFlagsFactory',
            function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, SweetAlert, who_we_are_pages, flags) {
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

                if($state.current.name == 'who_we_are_pages'){
                    $scope.who_we_are_page = [];

                    var timer = false;
                    $scope.$watch('filters', function(){
                        if(timer){
                            $timeout.cancel(timer)
                        }
                        timer= $timeout(function(){
                            if($scope.page > Math.ceil($scope.count / $scope.filters.per_page)) $scope.page = 1;
                            $scope.retrieveWhoWeArePages();
                        }, 500)
                    }, true);

                    $scope.page = 1;
                    $scope.retrieveWhoWeArePages = function(){
                        who_we_are_pages.all({page: $scope.page, query: $scope.filters}).success(function (data) {
                            $scope.who_we_are_pages = data.who_we_are_pages;
                            $scope.count = data.count;

                            var pagination = $('#who_we_are_pages-pagination');
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
                                        $scope.retrieveWhoWeArePages();
                                    }
                                })
                            }
                        }).error(function (data) {

                        });
                    };

                    $scope.retrieveWhoWeArePages();
                }

                if($state.current.name == 'edit_who_we_are_page'){

                    $scope.who_we_are_page = {};

                    who_we_are_pages.show($stateParams.id)
                        .success(function(data){
                                $timeout(function(){
                                    $scope.who_we_are_page = data.who_we_are_page;
                                }, 0);
                            }
                        );

                    $scope.save = function(){
                        $scope.submitted = true;

                        $scope.formPending = true;
                        who_we_are_pages.upsert($scope.who_we_are_page)
                            .success(function(){
                                $scope.formPending = false;
                                $state.go('who_we_are_pages')
                            })
                            .error(function(data){
                                $scope.validation_errors = data.errors;
                                $scope.formPending = false;
                            })
                    };
                }

                if($state.current.name == 'show_who_we_are_page'){
                    who_we_are_pages.show($stateParams.id).success(function(data){
                        $scope.who_we_are_page = data.who_we_are_page;

                    });
                }
            }])

}());