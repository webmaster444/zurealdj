(function () {

    "use strict";

    angular.module('ZurealdjApp')
        .controller('CrewPagesController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce', 'SweetAlert', 'CrewPagesFactory', 'CountryFlagsFactory',
            function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, SweetAlert, crew_pages, flags) {
                $scope.I18n = I18n;
                $scope._ = _;
                $scope.$state = $state;

                $scope.getHtml = function(html){
                    return $sce.trustAsHtml(html);
                };


                $scope.filters = {};

                if($state.current.name == 'crew_pages'){
                    $scope.crew_page = [];

                    var timer = false;
                    $scope.$watch('filters', function(){
                        if(timer){
                            $timeout.cancel(timer)
                        }
                        timer= $timeout(function(){
                            $scope.retrieveCrewPages();
                        }, 500)
                    }, true);

                    $scope.page = 1;
                    $scope.retrieveCrewPages = function(){
                        crew_pages.all({page: $scope.page, query: $scope.filters}).success(function (data) {
                            $scope.crew_pages = data.crew_pages;
                            $scope.count = data.count;

                            var pagination = $('#crew_pages-pagination');
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
                                        $scope.retrieveCrewPages();
                                    }
                                })
                            }
                        }).error(function (data) {

                        });
                    };

                    $scope.retrieveCrewPages();
                }

                $scope.destroy = function(id){
                    var scope = $scope;
                    SweetAlert.swal({
                            title: "Are you sure?",
                            text: "Your will not be able to recover this crew_page!",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
                            cancelButtonText: "No, cancel plx!",
                            closeOnConfirm: true,
                            closeOnCancel: true,
                            allowOutsideClick: true },
                        function(isConfirm){
                            if (isConfirm) {
                                crew_pages.destroy(id).success(function(){
                                    $scope.retrieveCrewPages();
                                });
                            } else {

                            }
                        }
                    );
                };

                if($state.current.name == 'new_crew_page' || $state.current.name == 'edit_crew_page'){

                    $scope.crew_page = {};


                    if($state.current.name == 'edit_crew_page'){
                        crew_pages.show($stateParams.id)
                            .success(function(data){
                                $timeout(function(){
                                    $scope.crew_page = data.crew_page;
                                }, 0);
                            }
                        )
                    }

                    $scope.submitCrewPage = function(){
                        $scope.submitted = true;
                        if($scope.CrewPageForm.$invalid ){
                            return false;
                        }

                        $scope.formPending = true;
                        crew_pages.upsert($scope.crew_page)
                            .success(function(){
                                $scope.formPending = false;
                                $state.go('crew_pages')
                            })
                            .error(function(data){
                                $scope.validation_errors = data.errors;
                                $scope.formPending = false;
                            })
                    };
                }

                if($state.current.name == 'show_crew_page'){
                    crew_pages.show($stateParams.id).success(function(data){
                        $scope.crew_page = data.crew_page;

                    });
                }
            }])

}());