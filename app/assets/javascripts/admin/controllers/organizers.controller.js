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
                            per_page: 10,
                            page: 1
                        };
                    };

                    $scope.resetFilters();

                    var timer = false;
                    $scope.$watch('filters', function(){
                        if(timer){
                            $timeout.cancel(timer)
                        }
                        timer = $timeout(function(){
                            if($scope.filters.page > Math.ceil($scope.total / $scope.filters.per_page)) $scope.page = 1;
                            $scope.retrieveOrganizers();
                        }, 500)
                    }, true);

                    $scope.retrieveOrganizers = function(){
                        organizers.all($scope.filters).success(function (data) {
                            $scope.organizers = data.organizers;
                            $scope.total = data.count;
                        })
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