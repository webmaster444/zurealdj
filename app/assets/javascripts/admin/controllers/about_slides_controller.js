(function () {

    "use strict";

    angular.module('ZurealdjAdminApp')
        .controller('AboutSlidesController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce',
            'SweetAlert', 'AboutSlidesFactory',
            function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, SweetAlert, slidesFactory) {
                switch($state.current.name){
                    case 'about_slides':
                        $scope.slides = [];
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
                                $scope.retrieveSlides();
                            }, 500)
                        }, true);

                        $scope.page = 1;
                        $scope.retrieveSlides = function(){
                            slidesFactory.all({page: $scope.page, query: $scope.filters}).success(function (data) {
                                $scope.slides = data.slides;
                                $scope.count = data.count;
                                var pagination = $('#slides-pagination');
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
                                            $scope.retrieveSlides();
                                        }
                                    })
                                }
                            }).error(function (data) {

                            });
                        };

                        $scope.retrieveSlides();
                        $scope.destroy = function(id){
                            var scope = $scope;
                            SweetAlert.swal({
                                    title: "Are you sure?",
                                    text: "Your will not be able to recover this slide!",
                                    type: "warning",
                                    showCancelButton: true,
                                    confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
                                    cancelButtonText: "No, cancel plx!",
                                    closeOnConfirm: true,
                                    closeOnCancel: true,
                                    allowOutsideClick: true },
                                function(isConfirm){
                                    if (isConfirm) {
                                        slidesFactory.destroy(id).success(function(){
                                            $scope.retrieveSlides();
                                        });
                                    } else {

                                    }
                                }
                            );
                        };
                        break;
                    case 'new_about_slide':
                    case 'edit_about_slide':

                        $scope.slide = {};


                        if($state.current.name == 'edit_about_slide'){
                            slidesFactory.show($stateParams.id)
                                .success(function(data){
                                        $scope.slide = data.slide;
                                    }
                                )
                        }

                        $scope.save = function(){
                            $scope.submitted = true;
                            $scope.formPending = true;
                            slidesFactory.upsert($scope.slide)
                                .success(function(){
                                    $scope.formPending = false;
                                    $state.go('about_slides')
                                })
                                .error(function(data){
                                    $scope.validation_errors = data.validation_errors;
                                    $scope.formPending = false;
                                })
                        };
                        break;
                }

            }])
}());