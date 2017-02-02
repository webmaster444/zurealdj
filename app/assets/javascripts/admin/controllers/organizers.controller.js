(function () {

    "use strict";

    angular.module('ZurealdjAdminApp')
        .controller('OrganizersController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce', 'SweetAlert',
            'OrganizersFactory', 'CountryFlagsFactory',
            function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, SweetAlert, organizers, flags) {
                $scope.I18n = I18n;
                $scope._ = _;
                $scope.$state = $state;

                $scope.getHtml = function(html){
                    return $sce.trustAsHtml(html);
                };

                flags.all().success(function(data){
                    $scope.flags = data.flags;
                });

                if($state.current.name == 'organizers'){
                    $scope.organizers = [];

                    $scope.resetFilters = function(){
                        $scope.filters = {
                            page: 1,
                            per_page: 10
                        };
                    };
                    $scope.resetFilters();

                    var timer = false;
                    $scope.$watch('filters', function(){
                        if(timer){
                            $timeout.cancel(timer)
                        }
                        timer = $timeout(function(){
                            if($scope.page > Math.ceil($scope.count / $scope.filters.per_page)) $scope.page = 1;
                            $scope.retrieveOrganizers();
                        }, 500)
                    }, true);

                    $scope.page = 1;
                    $scope.retrieveOrganizers = function(){
                        organizers.all({page: $scope.page, query: $scope.filters}).success(function (data) {
                            $scope.organizers = data.organizers;
                            $scope.count = data.count;

                            var pagination = $('#organizers-pagination');
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
                                        $scope.retrieveOrganizers();
                                    }
                                })
                            }
                        }).error(function (data) {

                        });
                    };

                    $scope.retrieveOrganizers();

                    $scope.downloadCSV = function () {
                        organizers.downloadCSV({query: $scope.filters})
                    }
                }

                $scope.destroy = function(id){
                    var scope = $scope;
                    SweetAlert.swal({
                            title: "Are you sure?",
                            text: "Your will not be able to recover this Organiser!",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
                            cancelButtonText: "No, cancel plx!",
                            closeOnConfirm: true,
                            closeOnCancel: true,
                            allowOutsideClick: true },
                        function(isConfirm){
                            if (isConfirm) {
                                organizers.destroy(id).success(function(){
                                    $scope.retrieveOrganizers();
                                });
                            } else {

                            }
                        }
                    );
                };

                if($state.current.name == 'edit_organizer'){

                    $scope.organizer = {};


                    if($state.current.name == 'edit_organizer'){
                        organizers.show($stateParams.id)
                            .success(function(data){
                                $scope.organizer = data.organizer;
                            }
                        )
                    }

                    $scope.submitOrganization = function(){
                        $scope.submitted = true;
                        // if($scope.OrganizationForm.$invalid ){
                        //     return false;
                        // }

                        $scope.formPending = true;
                        organizers.upsert($scope.organizer)
                            .success(function(){
                                $scope.formPending = false;
                                $state.go('organizers')
                            })
                            .error(function(data){
                                $scope.validation_errors = data.errors;
                                $scope.formPending = false;
                            })
                    };
                }
            }])

}());