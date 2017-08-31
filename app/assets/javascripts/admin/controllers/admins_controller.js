(function () {

    "use strict";

    angular.module('ZurealdjAdminApp')
        .controller('AdminsController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce', 'SweetAlert','AdminsFactory',
        function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, SweetAlert, users) {
            $scope.I18n = I18n;
            $scope._ = _;
            $scope.$state = $state;

            $scope.admin = {};

            if($state.current.name == 'admins') {
                $scope.admin = [];
                $scope.resetFilters = function(){
                    $scope.filters = {
                        per_page: 10
                    };
                };
                $scope.resetFilters();
                var timer = false;
                $scope.$watch('filters', function () {
                    if (timer) {
                        $scope.page = 1;
                        $timeout.cancel(timer)
                    }
                    timer = $timeout(function () {
                        $scope.retrieveUsers();
                    }, 500)
                }, true);
                $scope.page = 1;
                $scope.retrieveUsers = function () {
                    users.all({page: $scope.page, query: $scope.filters}).success(function (data) {
                        $scope.users = data.admins;
                        $scope.count = data.count;
                        var pagination = $('#users-pagination');
                        pagination.empty();
                        pagination.removeData('twbs-pagination');
                        pagination.unbind('page');
                        if ($scope.count > 0) {
                            pagination.twbsPagination({
                                totalPages: Math.ceil($scope.count / $scope.filters.per_page),
                                startPage: $scope.page,
                                visiblePages: 9,
                                onPageClick: function (event, page) {
                                    $scope.page = page;
                                    $scope.retrieveUsers();
                                }
                            })
                        }
                    }).error(function (data) {
                    });
                };
                $scope.retrieveUsers();

            }
            $scope.destroy = function(id){
                SweetAlert.swal({
                        title: "Are you sure?",
                        text: "Your will not be able to recover this admin!",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
                        cancelButtonText: "No, cancel plx!",
                        closeOnConfirm: false,
                        closeOnCancel: false },
                    function(isConfirm){
                        if (isConfirm) {
                            users.destroy(id).success(function(){
                                $scope.retrieveUsers();
                                SweetAlert.swal("Deleted!", "This admin has been deleted.", "success");
                            });
                        } else {
                            SweetAlert.swal("Cancelled", "Admin user is safe :)", "error");
                        }
                    }
                );
            };
            if($state.current.name == 'new_admin'){
                $scope.admin = {

                };
                $scope.validation_errors = {};

                $scope.$watch('admin', function(new_value, old_value){
                    for(var key in $scope.admin) {
                        if(new_value[key] != old_value[key])
                            $scope.validation_errors[key] = null;
                    }
                }, true);
                $scope.submitAdmin = function(){
                    $scope.submitted = true;
                    $scope.formPending = true;
                    users.upsert($scope.admin)
                        .success(function(){
                            $scope.formPending = false;
                            $state.go('admins')
                        })
                        .error(function(data){
                            $scope.validation_errors = data.validation_errors;
                            $scope.formPending = false;
                        })
                };
            }
        }])
}());