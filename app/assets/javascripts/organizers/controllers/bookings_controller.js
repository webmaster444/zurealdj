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

                $scope.save = function(date){
                    $scope.booking.dj_id = $scope.user.id;
                    bookings.book($scope.booking)
                        .success(function(){
                            $scope.closeThisDialog();
                        })
                        .error(function(data){
                        $scope.validation_errors = data.errors;
                    })
                }

            }])

}());