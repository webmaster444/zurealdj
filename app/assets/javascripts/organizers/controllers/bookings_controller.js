(function () {

    "use strict";

    angular.module('ZurealdjOrganizerApp')
        .controller('BookingsController', ['$scope', '$state', '$stateParams', '$timeout', '$sce', 'BookingsFactory', 'EventsFactory',
            function ($scope, $state, $stateParams, $timeout, $sce, bookings, events) {
                $scope.I18n = I18n;
                $scope._ = _;
                $scope.$state = $state;

                var timer = false;

                $scope.booking = {};

                $scope.retrieveEvents = function(term){
                    if(timer){
                        $timeout.cancel(timer)
                    }
                    timer = $timeout(function(){
                        events.all({title: term}).success(function(data){
                            $scope.events = data.events;
                        })
                    }, 500)
                };

                $scope.fromDateOptions = {
                    dateDisabled: false,
                    formatYear: 'yy',
                    // maxDate: new Date(2020, 5, 22),
                    // minDate: new Date(),
                    startingDay: 1,
                    showWeeks: false
                };

                $scope.toDateOptions = {
                    dateDisabled: false,
                    formatYear: 'yy',
                    // maxDate: new Date(2020, 5, 22),
                    // minDate: new Date(),
                    startingDay: 1,
                    showWeeks: false
                };

                $scope.eventSelected = function(){
                    if ($scope.booking.event && $scope.booking.event.start_date && $scope.booking.event.end_date){

                        var startParts = $scope.booking.event.start_date.split("/");
                        var endParts = $scope.booking.event.end_date.split("/");

                        var startDate = new Date(startParts[2], (startParts[1] - 1), startParts[0]);
                        var endDate = new Date(endParts[2], (endParts[1] - 1), endParts[0]);

                        $scope.fromDateOptions.minDate = startDate;
                        $scope.fromDateOptions.maxDate = endDate;
                        $scope.toDateOptions.minDate = startDate;
                        $scope.toDateOptions.maxDate = endDate;

                    }
                }
                $scope.save = function(date){
                    $scope.processing = true;
                    $scope.booking.dj_id = $scope.user.id;
                    bookings.book($scope.booking)
                        .success(function(){
                            $scope.closeThisDialog();
                            $scope.processing = false;
                        })
                        .error(function(data){
                            $scope.$parent.validation_errors = data.validation_errors;
                            $scope.processing = false;
                    })
                }

            }])

}());