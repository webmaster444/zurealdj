(function () {

    "use strict";

    angular.module('ZurealdjApp')
        .controller('OrganizationsController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce', 'SweetAlert', 'OrganizationsFactory', 'CountryFlagsFactory',
            function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, SweetAlert, organizations, flags) {
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

                if($state.current.name == 'organizations'){
                    $scope.organization = [];

                    var timer = false;
                    $scope.$watch('filters', function(){
                        if(timer){
                            $timeout.cancel(timer)
                        }
                        timer= $timeout(function(){
                            $scope.retrieveOrganizations();
                        }, 500)
                    }, true);

                    $scope.page = 1;
                    $scope.retrieveOrganizations = function(){
                        organizations.all({page: $scope.page, query: $scope.filters}).success(function (data) {
                            $scope.organizations = data.organizations;
                            $scope.count = data.count;

                            var pagination = $('#organizations-pagination');
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
                                        $scope.retrieveOrganizations();
                                    }
                                })
                            }
                        }).error(function (data) {

                        });
                    };

                    $scope.retrieveOrganizations();
                }

                $scope.destroy = function(id){
                    var scope = $scope;
                    SweetAlert.swal({
                            title: "Are you sure?",
                            text: "Your will not be able to recover this organizations!",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
                            cancelButtonText: "No, cancel plx!",
                            closeOnConfirm: true,
                            closeOnCancel: true,
                            allowOutsideClick: true },
                        function(isConfirm){
                            if (isConfirm) {
                                organizations.destroy(id).success(function(){
                                    $scope.retrieveOrganizations();
                                });
                            } else {

                            }
                        }
                    );
                };

                if($state.current.name == 'new_organization' || $state.current.name == 'edit_organization'){

                    $scope.organization = {};


                    if($state.current.name == 'edit_organization'){
                        organizations.show($stateParams.id)
                            .success(function(data){
                                $timeout(function(){
                                    $scope.organization = data.organization;
                                }, 0);
                            }
                        )
                    }

                    $scope.submitOrganization = function(){
                        $scope.submitted = true;
                        if($scope.OrganizationForm.$invalid ){
                            return false;
                        }

                        $scope.formPending = true;
                        organizations.upsert($scope.organization)
                            .success(function(){
                                $scope.formPending = false;
                                $state.go('organizations')
                            })
                            .error(function(data){
                                $scope.validation_errors = data.errors;
                                $scope.formPending = false;
                            })
                    };
                }

                if($state.current.name == 'show_organization'){
                    organizations.show($stateParams.id).success(function(data){
                        $scope.organization = data.organization;

                    });
                }
            }])

}());