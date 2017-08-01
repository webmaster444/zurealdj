(function () {

    "use strict";

    angular.module('ZurealdjAdminApp')
        .controller('SubscriptionsController', ['$scope', '$state', '$stateParams', 'SweetAlert', 'SubscriptionsFactory', '$timeout',
            function ($scope, $state, $stateParams, SweetAlert, subscriptions, $timeout) {
                $scope.I18n = I18n;

                if($state.current.name == 'subscriptions'){

                    $scope.list = ["one", "two", "thre", "four", "five", "six"];

                    $scope.retrieve = function(){
                        subscriptions.all()
                            .success(function (data) {
                                $scope.subscriptions = data.subscriptions;
                                $scope.total = data.total;

                                var dragtimer = false;
                                var initializing = true;
                                $scope.$watch('subscriptions', function(){
                                    if(initializing){
                                        initializing = false
                                    }else{
                                        if(dragtimer){
                                            $timeout.cancel(dragtimer)
                                        }
                                        dragtimer = $timeout(function(){
                                            subscriptions.updateOrder($scope.subscriptions);
                                        }, 500)
                                    }
                                }, true)
                            });
                    };

                    $scope.retrieve();
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