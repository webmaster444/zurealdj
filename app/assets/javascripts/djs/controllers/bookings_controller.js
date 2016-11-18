(function () {

    "use strict";

    angular.module('ZurealdjApp')
        .controller('BookingsController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce', 'SweetAlert', 'BookingsFactory', 'CountryFlagsFactory',
            function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, SweetAlert, bookings, flags) {
                $scope.I18n = I18n;
                $scope._ = _;
                $scope.$state = $state;

                $scope.getHtml = function(html){
                    return $sce.trustAsHtml(html);
                };


                $scope.filters = {};

                if($state.current.name == 'bookings'){
                    $scope.booking = [];

                    var timer = false;
                    $scope.$watch('filters', function(){
                        if(timer){
                            $timeout.cancel(timer)
                        }
                        timer= $timeout(function(){
                            $scope.retrieveBookings();
                        }, 500)
                    }, true);

                    $scope.page = 1;
                    $scope.retrieveBookings = function(){
                        bookings.all({page: $scope.page, query: $scope.filters}).success(function (data) {
                            $scope.bookings = data.bookings;
                            $scope.count = data.count;

                            var pagination = $('#bookings-pagination');
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
                                        $scope.retrieveBookings();
                                    }
                                })
                            }
                        }).error(function (data) {

                        });
                    };

                    $scope.retrieveBookings();
                }

                $scope.destroy = function(id){
                    var scope = $scope;
                    SweetAlert.swal({
                            title: "Are you sure?",
                            text: "Your will not be able to recover this bookings!",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
                            cancelButtonText: "No, cancel plx!",
                            closeOnConfirm: true,
                            closeOnCancel: true,
                            allowOutsideClick: true },
                        function(isConfirm){
                            if (isConfirm) {
                                bookings.destroy(id).success(function(){
                                    $scope.retrieveBookings();
                                });
                            } else {

                            }
                        }
                    );
                };

                if($state.current.name == 'new_booking' || $state.current.name == 'edit_booking'){

                    $scope.booking = {};

                    bookings.users()
                        .success(function(data){
                            $scope.users = data.users;
                        }
                    );
                    bookings.events()
                        .success(function(data){
                            $scope.events = data.events;
                        }
                    );

                    if($state.current.name == 'edit_booking'){
                        bookings.show($stateParams.id)
                            .success(function(data){
                                $timeout(function(){
                                    $scope.booking = data.booking;
                                }, 0);
                            }
                        )
                    }

                    $scope.submitBooking = function(){
                        $scope.submitted = true;
                        if($scope.BookingForm.$invalid ){
                            return false;
                        }

                        $scope.formPending = true;
                        bookings.upsert($scope.booking)
                            .success(function(){
                                $scope.formPending = false;
                                $state.go('bookings')
                            })
                            .error(function(data){
                                $scope.validation_errors = data.errors;
                                $scope.formPending = false;
                            })
                    };
                }

                if($state.current.name == 'show_booking'){
                    bookings.show($stateParams.id).success(function(data){
                        $scope.booking = data.booking;

                    });
                }
            }])

}());