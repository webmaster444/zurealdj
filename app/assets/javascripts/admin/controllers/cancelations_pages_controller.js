(function () {

    "use strict";

    angular.module('ZurealdjAdminApp')
        .controller('CancelationsPagesController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce', 'SweetAlert', 'CancelationsPagesFactory', 'CountryFlagsFactory',
            function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, SweetAlert, cancelations_pages, flags) {
                $scope.I18n = I18n;
                $scope._ = _;
                $scope.$state = $state;

                $scope.getHtml = function(html){
                    return $sce.trustAsHtml(html);
                };


                $scope.filters = {};

                if($state.current.name == 'cancelations_pages'){
                    $scope.cancelations_page = [];

                    var timer = false;
                    $scope.$watch('filters', function(){
                        if(timer){
                            $timeout.cancel(timer)
                        }
                        timer= $timeout(function(){
                            $scope.retrieveCancelationsPages();
                        }, 500)
                    }, true);

                    $scope.page = 1;
                    $scope.retrieveCancelationsPages = function(){
                        cancelations_pages.all({page: $scope.page, query: $scope.filters}).success(function (data) {
                            $scope.cancelations_pages = data.cancelations_pages;
                            $scope.count = data.count;

                            var pagination = $('#cancelations_pages-pagination');
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
                                        $scope.retrieveCancelationsPages();
                                    }
                                })
                            }
                        }).error(function (data) {

                        });
                    };

                    $scope.retrieveCancelationsPages();
                }

                $scope.destroy = function(id){
                    var scope = $scope;
                    SweetAlert.swal({
                            title: "Are you sure?",
                            text: "Your will not be able to recover this cancelations_page!",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
                            cancelButtonText: "No, cancel plx!",
                            closeOnConfirm: true,
                            closeOnCancel: true,
                            allowOutsideClick: true },
                        function(isConfirm){
                            if (isConfirm) {
                                cancelations_pages.destroy(id).success(function(){
                                    $scope.retrieveCancelationsPages();
                                });
                            } else {

                            }
                        }
                    );
                };

                if($state.current.name == 'new_cancelations_page' || $state.current.name == 'edit_cancelations_page'){

                    $scope.cancelations_page = {};


                    if($state.current.name == 'edit_cancelations_page'){
                        cancelations_pages.show($stateParams.id)
                            .success(function(data){
                                $timeout(function(){
                                    $scope.cancelations_page = data.cancelations_page;
                                }, 0);
                            }
                        )
                    }

                    $scope.submitCancelationsPage = function(){
                        $scope.submitted = true;
                        if($scope.CancelationsPageForm.$invalid ){
                            return false;
                        }

                        $scope.formPending = true;
                        cancelations_pages.upsert($scope.cancelations_page)
                            .success(function(){
                                $scope.formPending = false;
                                $state.go('cancelations_pages')
                            })
                            .error(function(data){
                                $scope.validation_errors = data.errors;
                                $scope.formPending = false;
                            })
                    };
                }

                if($state.current.name == 'show_cancelations_page'){
                    cancelations_pages.show($stateParams.id).success(function(data){
                        $scope.cancelations_page = data.cancelations_page;

                    });
                }
            }])

}());