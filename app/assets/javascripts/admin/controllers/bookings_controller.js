(function () {

    "use strict";

    angular.module('ZurealdjAdminApp')
        .controller('BookingsController', ['$scope', '$state', '$stateParams', '$timeout', '$sce', 'SweetAlert', 'BookingsFactory',
            function ($scope, $state, $stateParams, $timeout, $sce, SweetAlert, bookings) {
                $scope.I18n = I18n;
                $scope._ = _;
                $scope.$state = $state;

                $scope.getHtml = function(html){
                    return $sce.trustAsHtml(html);
                };

                $scope.page = 1;

                $scope.resetFilters = function(){
                    $scope.page = 1;
                    $scope.filters = {
                        per_page: 10
                    };
                };

                $scope.resetFilters();

                if($state.current.name == 'bookings'){
                    $scope.booking = [];

                    var timer = false;
                    $scope.$watch('filters', function(){
                        if(timer){
                            $scope.page = 1;
                            $timeout.cancel(timer)
                        }
                        timer= $timeout(function(){
                            $scope.retrieveBookings();
                        }, 500)
                    }, true);

                    $scope.$watch('page', function(){
                        if(timer){
                            $timeout.cancel(timer)
                        }
                        timer= $timeout(function(){
                            $scope.retrieveBookings();
                        }, 500)
                    });

                    $scope.retrieveBookings = function(){
                        bookings.all($scope.filters, $scope.page).success(function (data) {
                            $scope.bookings = data.bookings;
                            $scope.total = data.count;
                        }).error(function (data) {

                        });
                    };

                    $scope.retrieveBookings();

                    $scope.downloadCSV = function(){
                        bookings.downloadCSV({query: $scope.filters})
                    }
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
            }])

}());