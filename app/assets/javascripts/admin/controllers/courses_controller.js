(function () {

    "use strict";

    angular.module('ZurealdjAdminApp')
        .controller('CoursesController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce', 'SweetAlert', 'CoursesFactory', 'CountryFlagsFactory',
            function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, SweetAlert, courses, flags) {
                $scope.I18n = I18n;
                $scope._ = _;
                $scope.$state = $state;

                $scope.getHtml = function(html){
                    return $sce.trustAsHtml(html);
                };

                if($state.current.name == 'courses'){
                    $scope.course = [];
                    $scope.resetFilters = function(){
                        $scope.filters = {
                            per_page: 10
                        };
                    };
                    $scope.resetFilters();
                    $scope.new = true;

                    var timer = false;
                    $scope.$watch('filters', function(){
                        if(timer){
                            $timeout.cancel(timer)
                        }
                        timer= $timeout(function(){
                            if($scope.page > Math.ceil($scope.count / $scope.filters.per_page)) $scope.page = 1;
                            $scope.retrieveCourses();
                        }, 500)
                    }, true);

                    $scope.page = 1;
                    $scope.retrieveCourses = function(){
                        courses.all({page: $scope.page, query: $scope.filters}).success(function (data) {
                            $scope.courses = data.courses;
                            $scope.count = data.count;

                            var pagination = $('#courses-pagination');
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
                                        $scope.retrieveCourses();
                                    }
                                })
                            }
                        }).error(function (data) {

                        });
                    };

                    $scope.retrieveCourses();

                    $scope.downloadCSV = function () {
                        courses.downloadCSV({query: $scope.filters})
                    }
                }

                $scope.destroy = function(id){
                    var scope = $scope;
                    SweetAlert.swal({
                            title: "Are you sure?",
                            text: "Your will not be able to recover this courses!",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
                            cancelButtonText: "No, cancel plx!",
                            closeOnConfirm: true,
                            closeOnCancel: true,
                            allowOutsideClick: true },
                        function(isConfirm){
                            if (isConfirm) {
                                courses.destroy(id).success(function(){
                                    $scope.retrieveCourses();
                                });
                            } else {

                            }
                        }
                    );
                };

                if($state.current.name == 'new_course' || $state.current.name == 'edit_course'){

                    $scope.course = {};


                    if($state.current.name == 'edit_course'){
                        courses.show($stateParams.id)
                            .success(function(data){
                                $timeout(function(){
                                    $scope.course = data.course;
                                }, 0);
                            }
                        )
                    }

                    $scope.submitCourse = function(){
                        $scope.submitted = true;
                        if($scope.CourseForm.$invalid ){
                            return false;
                        }

                        $scope.formPending = true;
                        courses.upsert($scope.course)
                            .success(function(){
                                $scope.formPending = false;
                                $state.go('courses')
                            })
                            .error(function(data){
                                $scope.validation_errors = data.errors;
                                $scope.formPending = false;
                            })
                    };
                }

                if($state.current.name == 'show_course'){
                    courses.show($stateParams.id).success(function(data){
                        $scope.course = data.course;

                    });
                }
            }])

}());