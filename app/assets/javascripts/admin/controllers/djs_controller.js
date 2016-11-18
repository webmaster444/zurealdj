(function () {

    "use strict";

    angular.module('ZurealdjAdminApp')
        .controller('DjsController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce', 'SweetAlert', 'DjsFactory', 'CountryFlagsFactory',
            function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, SweetAlert, djs, flags) {
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

                if($state.current.name == 'djs'){
                    $scope.dj = [];

                    var timer = false;
                    $scope.$watch('filters', function(){
                        if(timer){
                            $timeout.cancel(timer)
                        }
                        timer= $timeout(function(){
                            $scope.retrieveDjs();
                        }, 500)
                    }, true);

                    $scope.page = 1;
                    $scope.retrieveDjs = function(){
                        djs.all({page: $scope.page, query: $scope.filters}).success(function (data) {
                            $scope.djs = data.djs;
                            $scope.count = data.count;

                            var pagination = $('#djs-pagination');
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
                                        $scope.retrieveDjs();
                                    }
                                })
                            }
                        }).error(function (data) {

                        });
                    };

                    $scope.retrieveDjs();
                }

                $scope.destroy = function(id){
                    var scope = $scope;
                    SweetAlert.swal({
                            title: "Are you sure?",
                            text: "Your will not be able to recover this djs!",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
                            cancelButtonText: "No, cancel plx!",
                            closeOnConfirm: true,
                            closeOnCancel: true,
                            allowOutsideClick: true },
                        function(isConfirm){
                            if (isConfirm) {
                                djs.destroy(id).success(function(){
                                    $scope.retrieveDjs();
                                });
                            } else {

                            }
                        }
                    );
                };

                if($state.current.name == 'new_dj' || $state.current.name == 'edit_dj'){

                    $scope.dj = {};


                    if($state.current.name == 'edit_dj'){
                        djs.show($stateParams.id)
                            .success(function(data){
                                $timeout(function(){
                                    $scope.dj = data.dj;
                                }, 0);
                            }
                        )
                    }

                    $scope.submitDj = function(){
                        $scope.submitted = true;
                        if($scope.DjForm.$invalid ){
                            return false;
                        }

                        $scope.formPending = true;
                        djs.upsert($scope.dj)
                            .success(function(){
                                $scope.formPending = false;
                                $state.go('djs')
                            })
                            .error(function(data){
                                $scope.validation_errors = data.errors;
                                $scope.formPending = false;
                            })
                    };
                }

                if($state.current.name == 'show_dj'){
                    djs.show($stateParams.id).success(function(data){
                        $scope.dj = data.dj;

                    });
                }
            }])

}());