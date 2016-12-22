(function () {

    "use strict";

    angular.module('ZurealdjAdminApp')
        .controller('HowWeWorkPagesController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce', 'SweetAlert', 'HowWeWorkPagesFactory', 'CountryFlagsFactory',
            function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, SweetAlert, how_we_work_pages, flags) {
                $scope.I18n = I18n;
                $scope._ = _;
                $scope.$state = $state;

                $scope.getHtml = function(html){
                    return $sce.trustAsHtml(html);
                };

                flags.all().success(function(data){
                    $scope.flags = data.flags;
                });

                $scope.filters = {};

                if($state.current.name == 'how_we_work_pages'){
                    $scope.how_we_work_page = [];

                    var timer = false;
                    $scope.$watch('filters', function(){
                        if(timer){
                            $scope.page = 1;
                            $timeout.cancel(timer)
                        }
                        timer= $timeout(function(){
                            $scope.retrieveHowWeWorkPages();
                        }, 500)
                    }, true);

                    $scope.page = 1;
                    $scope.retrieveHowWeWorkPages = function(){
                        how_we_work_pages.all({page: $scope.page, query: $scope.filters}).success(function (data) {
                            $scope.how_we_work_pages = data.how_we_work_pages;
                            $scope.count = data.count;

                            var pagination = $('#how_we_work_pages-pagination');
                            pagination.empty();
                            pagination.removeData('twbs-pagination');
                            pagination.unbind('page');

                            if($scope.count > 0){
                                pagination.twbsPagination({
                                    totalPages: Math.ceil($scope.count / 10),
                                    startPage: $scope.page,
                                    visiblePages: 9,
                                    onPageClick: function (event, page) {
                                        $scope.page = page;
                                        $scope.retrieveHowWeWorkPages();
                                    }
                                })
                            }
                        }).error(function (data) {

                        });
                    };

                    $scope.retrieveHowWeWorkPages();
                }

                if($state.current.name == 'edit_how_we_work_page'){

                    $scope.how_we_work_page = {};

                    how_we_work_pages.show($stateParams.id)
                        .success(function(data){
                                $timeout(function(){
                                    $scope.how_we_work_page = data.how_we_work_page;
                                }, 0);
                            }
                        );

                    $scope.save = function(){
                        $scope.submitted = true;

                        $scope.formPending = true;
                        how_we_work_pages.upsert($scope.how_we_work_page)
                            .success(function(){
                                $scope.formPending = false;
                                $state.go('how_we_work_pages')
                            })
                            .error(function(data){
                                $scope.validation_errors = data.errors;
                                $scope.formPending = false;
                            })
                    };
                }

                if($state.current.name == 'show_how_we_work_page'){
                    how_we_work_pages.show($stateParams.id).success(function(data){
                        $scope.how_we_work_page = data.how_we_work_page;

                    });
                }
            }])

}());

