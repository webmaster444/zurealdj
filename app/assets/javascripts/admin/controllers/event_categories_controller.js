(function () {

    "use strict";

    angular.module('ZurealdjAdminApp')
        .controller('EventCategoriesController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce', 'SweetAlert', 'EventCategoriesFactory', 'CountryFlagsFactory',
            function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, SweetAlert, event_categories, flags) {
                $scope.I18n = I18n;
                $scope._ = _;
                $scope.$state = $state;

                $scope.getHtml = function(html){
                    return $sce.trustAsHtml(html);
                };

                if($state.current.name == 'event_categories'){
                    $scope.event_category = [];
                    $scope.resetFilters = function(){
                        $scope.filters = {
                            per_page: 10
                        };
                    };
                    $scope.resetFilters();

                    var timer = false;
                    $scope.$watch('filters', function(){
                        if(timer){
                            $timeout.cancel(timer)
                        }
                        timer= $timeout(function(){
                            if($scope.page > Math.ceil($scope.count / $scope.filters.per_page)) $scope.page = 1;
                            $scope.retrieveEventCategories();
                        }, 500)
                    }, true);

                    $scope.page = 1;
                    $scope.retrieveEventCategories = function(){
                        event_categories.all({page: $scope.page, query: $scope.filters}).success(function (data) {
                            $scope.event_categories = data.event_categories;
                            $scope.count = data.count;

                            var pagination = $('#event_categories-pagination');
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
                                        $scope.retrieveEventCategories();
                                    }
                                })
                            }
                        }).error(function (data) {

                        });
                    };

                    $scope.retrieveEventCategories();

                    $scope.downloadCSV = function () {
                        event_categories.downloadCSV({query: $scope.filters})
                    }
                }

                $scope.destroy = function(id){
                    var scope = $scope;
                    SweetAlert.swal({
                            title: "Are you sure?",
                            text: "Your will not be able to recover this event_categories!",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
                            cancelButtonText: "No, cancel plx!",
                            closeOnConfirm: true,
                            closeOnCancel: true,
                            allowOutsideClick: true },
                        function(isConfirm){
                            if (isConfirm) {
                                event_categories.destroy(id).success(function(){
                                    $scope.retrieveEventCategories();
                                });
                            } else {

                            }
                        }
                    );
                };

                if($state.current.name == 'new_event_category' || $state.current.name == 'edit_event_category'){

                    $scope.event_category = {};


                    if($state.current.name == 'edit_event_category'){
                        event_categories.show($stateParams.id)
                            .success(function(data){
                                $timeout(function(){
                                    $scope.event_category = data.event_category;
                                }, 0);
                            }
                        )
                    }

                    $scope.submitEventCategory = function(){
                        $scope.submitted = true;
                        if($scope.EventCategoryForm.$invalid ){
                            return false;
                        }

                        $scope.formPending = true;
                        event_categories.upsert($scope.event_category)
                            .success(function(){
                                $scope.formPending = false;
                                $state.go('event_categories')
                            })
                            .error(function(data){
                                $scope.validation_errors = data.errors;
                                $scope.formPending = false;
                            })
                    };
                }
            }])

}());