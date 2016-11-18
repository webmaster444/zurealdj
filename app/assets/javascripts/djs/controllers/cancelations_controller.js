(function () {

    "use strict";

    angular.module('ZurealdjApp')
        .controller('CancelationsController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce', 'SweetAlert', 'CancelationsFactory', 'CountryFlagsFactory',
            function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, SweetAlert, cancelations, flags) {
                $scope.I18n = I18n;
                $scope._ = _;
                $scope.$state = $state;

                $scope.getHtml = function(html){
                    return $sce.trustAsHtml(html);
                };


                $scope.filters = {};

                if($state.current.name == 'cancelations'){
                    $scope.cancelation = [];

                    var timer = false;
                    $scope.$watch('filters', function(){
                        if(timer){
                            $timeout.cancel(timer)
                        }
                        timer= $timeout(function(){
                            $scope.retrieveCancelations();
                        }, 500)
                    }, true);

                    $scope.page = 1;
                    $scope.retrieveCancelations = function(){
                        cancelations.all({page: $scope.page, query: $scope.filters}).success(function (data) {
                            $scope.cancelations = data.cancelations;
                            $scope.count = data.count;

                            var pagination = $('#cancelations-pagination');
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
                                        $scope.retrieveCancelations();
                                    }
                                })
                            }
                        }).error(function (data) {

                        });
                    };

                    $scope.retrieveCancelations();
                }

                $scope.destroy = function(id){
                    var scope = $scope;
                    SweetAlert.swal({
                            title: "Are you sure?",
                            text: "Your will not be able to recover this cancelations!",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
                            cancelButtonText: "No, cancel plx!",
                            closeOnConfirm: true,
                            closeOnCancel: true,
                            allowOutsideClick: true },
                        function(isConfirm){
                            if (isConfirm) {
                                cancelations.destroy(id).success(function(){
                                    $scope.retrieveCancelations();
                                });
                            } else {

                            }
                        }
                    );
                };

                if($state.current.name == 'new_cancelation' || $state.current.name == 'edit_cancelation'){

                    $scope.cancelation = {};


                    if($state.current.name == 'edit_cancelation'){
                        cancelations.show($stateParams.id)
                            .success(function(data){
                                $timeout(function(){
                                    $scope.cancelation = data.cancelation;
                                }, 0);
                            }
                        )
                    }

                    $scope.submitCancelation = function(){
                        $scope.submitted = true;
                        if($scope.CancelationForm.$invalid ){
                            return false;
                        }

                        $scope.formPending = true;
                        cancelations.upsert($scope.cancelation)
                            .success(function(){
                                $scope.formPending = false;
                                $state.go('cancelations')
                            })
                            .error(function(data){
                                $scope.validation_errors = data.errors;
                                $scope.formPending = false;
                            })
                    };
                }

                if($state.current.name == 'show_cancelation'){
                    cancelations.show($stateParams.id).success(function(data){
                        $scope.cancelation = data.cancelation;

                    });
                }
            }])

}());