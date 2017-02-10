(function () {

    "use strict";

    angular.module('ZurealdjAdminApp')
        .controller('SubscriptionsController', ['$scope', '$state', '$stateParams', 'SweetAlert', 'SubscriptionsFactory', '$timeout',
            function ($scope, $state, $stateParams, SweetAlert, subscriptions, $timeout) {
                $scope.I18n = I18n;

                if($state.current.name == 'subscriptions'){

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
                            $scope.page = 1;
                            $scope.retrieve();
                        }, 500)
                    }, true);

                    $scope.retrieve = function(){
                        subscriptions.all($scope.filters)
                            .success(function (data) {
                                $scope.subscriptions = data.subscriptions;
                                $scope.total = data.total;
                            }).error(function (data) {

                            });
                    };

                    $scope.retrieve();

                    $scope.downloadCSV = function () {
                        equipments.downloadCSV({query: $scope.filters})
                    }
                }

                $scope.destroy = function(id){
                    var scope = $scope;
                    SweetAlert.swal({
                            title: "Are you sure?",
                            text: "Your will not be able to recover this subscription!",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
                            cancelButtonText: "No, cancel plx!",
                            closeOnConfirm: true,
                            closeOnCancel: true,
                            allowOutsideClick: true },
                        function(isConfirm){
                            if (isConfirm) {
                                subscriptions.destroy(id).success(function(){
                                    $scope.retrieve();
                                });
                            } else {

                            }
                        }
                    );
                };

                if($state.current.name == 'new_subscription' || $state.current.name == 'edit_subscription'){

                    $scope.subscription = {};

                    if($state.current.name == 'edit_subscription'){
                        subscriptions.show($stateParams.id)
                            .success(function(data){
                                $scope.subscription = data.subscription;
                            }
                        )
                    }

                    $scope.submit = function(){
                        $scope.submitted = true;

                        $scope.pending = true;
                        subscriptions.upsert($scope.subscription)
                            .success(function(){
                                $scope.pending = false;
                                $state.go('subscriptions')
                            })
                            .error(function(data){
                                $scope.validation_errors = data.errors;
                                $scope.pending = false;
                            })
                    };
                }
            }])

}());