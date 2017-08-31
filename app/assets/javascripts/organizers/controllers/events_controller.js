(function () {

    "use strict";

    angular.module('ZurealdjOrganizerApp')
        .controller('EventsController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce',
            'SweetAlert', 'EventsFactory', 'DjsFactory', 'BookingsFactory',
            function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, SweetAlert, events, djs, bookings) {
                $scope.I18n = I18n;
                $scope._ = _;
                $scope.$state = $state;

                $scope.getHtml = function (html) {
                    return $sce.trustAsHtml(html);
                };

                $scope.slider = {
                    default: true,
                    value: 0,
                    options: {
                        floor: 0,
                        ceil: 1000,
                        step: 1,
                        showSelectionBar: true
                    }
                };

                $scope.isOpen = function(){
                    setTimeout(function() {
                        $scope.$broadcast('rzSliderForceRender');
                    }, 100);
                };

                if($state.current.name == 'events'){

                    $scope.filters = {
                        page: 1,
                        per_page: 10,
                        price_from: 0,
                        price_to: 1000,
                        sort_column: 'created_at',
                        sort_type: 'desc'
                    };

                    $scope.next_page = false;

                    $scope.event = [];

                    $scope.getSortType = function() {
                        if($scope.filters.sort_column == 'title'){
                            return $scope.filters.sort_type == 'asc'? 'A-Z': 'Z-A';
                        }
                        else{
                            return $scope.filters.sort_type == 'desc'? 'Newest': 'Oldest';
                        }
                    };

                    $scope.setSortType = function(column, type) {

                        if(column == 'created_at' || column == 'title'){
                            $scope.filters.sort_column = column;
                        }
                        if(type == 'asc' || type == 'desc'){
                            $scope.filters.sort_type = type;
                        }
                    };

                    var timer = false;
                    $scope.$watch('filters', function(){
                        if(timer){
                            if(!$scope.next_page) $scope.filters.page = 1;
                            $timeout.cancel(timer);
                        }
                        timer = $timeout(function(){
                            $scope.retrieveEvents();
                        }, 500)
                    }, true);

                    $scope.resetFilters = function(){
                        $scope.filters = {
                            page: 1,
                            per_page: 10,
                            price_from: $scope.min_rate,
                            price_to: $scope.max_rate,
                            genres: angular.copy($scope.genres),
                            event_types: angular.copy($scope.event_types),
                            sort_column: 'created_at',
                            sort_type: 'desc'
                        };
                    };

                    $scope.retrieveEvents = function(){

                        events.filter($scope.filters).success(function (data) {

                            if($scope.next_page){
                                $scope.events = $scope.events.concat(data.events);
                                $scope.next_page = false;
                            }
                            else $scope.events = data.events;
                            $scope.count = data.count;

                            if($scope.slider.default){

                                $scope.filters.genres = data.genres;
                                $scope.filters.event_types = data.event_types;

                                $scope.genres = angular.copy(data.genres);
                                $scope.event_types = angular.copy(data.event_types);

                                $scope.slider.options.ceil = data.max_rate;
                                $scope.slider.default = false;
                                $scope.filters.price_from = $scope.min_rate = data.min_rate;
                                $scope.filters.price_to = $scope.max_rate = data.max_rate;

                            }

                        }).error(function (data) {

                        });
                    };

                    $scope.retrieveEvents();

                    $scope.showMore = function(){
                        if($scope.events.length < $scope.count){
                            $scope.next_page = true;
                            ++$scope.filters.page;
                        }
                    };

                    $scope.djsCount = function() {
                        var count = Math.round(($('.event-item').width() - 600) / 90);
                        return count > 4? 4: count;
                    };
                }

                $scope.openEventDialog = function (id) {
                    ngDialog.open({
                        template: 'organizers/templates/events/form.html',
                        controller: ['$scope', 'EventCategoriesFactory', 'CountryFlagsFactory', 'EventsFactory', 'GenresFactory',
                            function(scope, event_types, flags, events, genres) {

                                if(id){
                                    events.show(id).success(function(data){
                                        scope.event = data;

                                        scope.genres = data.genres;

                                        var dateParse = function(str) {
                                            var el = str.split("/");
                                            return new Date(el[2], --el[1], el[0]);
                                        };

                                        scope.event.start_date = dateParse(scope.event.start_date);
                                        scope.event.end_date = dateParse(scope.event.end_date);
                                    });
                                }

                                scope.save = function () {

                                    scope.event.genres = scope.genres;

                                    scope.processing = true;
                                    events.upsert(scope.event)
                                        .success(function () {
                                            scope.processing = false;
                                            scope.closeThisDialog();
                                            if(id) $state.go('events');
                                            else $scope.retrieveEvents();

                                        })
                                        .error(function (data) {
                                            scope.validation_errors = data.validation_errors;
                                            scope.processing = false;
                                        })
                                };

                                flags.all().success(function(data){
                                    scope.countries = data.flags;
                                });

                                event_types.all().success(function(data){
                                    scope.event_types = data.event_types;
                                });

                                genres.all().success(function(data){

                                    if (angular.isDefined(scope.genres)){
                                        for (var i in data.genres) {
                                            for (var j in scope.genres) {
                                                if (data.genres[i].id == scope.genres[j].id){
                                                    data.genres[i] = scope.genres[j];
                                                }
                                            }
                                        }
                                    }

                                    scope.genres = data.genres;
                                });

                                scope.event = {};

                                scope.cancel = function(){
                                    scope.closeThisDialog()
                                };

                                scope.checkSelectedGenres = function() {
                                    var result = false;

                                    if(scope.genres)
                                        scope.genres.forEach(function(genre) {
                                            if(genre.checked) result = true;
                                        });

                                    return result;
                                };

                                scope.destroy = function(id) {
                                    SweetAlert.swal({
                                            title: "Are you sure?",
                                            text: "Your will not be able to recover this events!",
                                            showCancelButton: true,
                                            confirmButtonColor: "#b05dfd", confirmButtonText: "Remove",
                                            cancelButtonText: "Cancel",
                                            closeOnConfirm: true,
                                            closeOnCancel: true,
                                        },
                                        function (isConfirm) {
                                            if (isConfirm) {
                                                events.destroy(id).success(function () {
                                                    scope.closeThisDialog();
                                                    window.location = '/organizer#/events';
                                                });
                                            } else {

                                            }
                                        }
                                    );
                                };

                                scope.startDateOptions = {
                                    dateDisabled: false,
                                    formatYear: 'yy',
                                    maxDate: new Date(2020, 5, 22),
                                    minDate: new Date(),
                                    startingDay: 1,
                                    showWeeks: false
                                };

                                scope.endDateOptions = {
                                    dateDisabled: false,
                                    formatYear: 'yy',
                                    maxDate: new Date(2020, 5, 22),
                                    minDate: new Date(),
                                    startingDay: 1,
                                    showWeeks: false
                                };
                            }],
                        className: 'ngdialog-theme-default dj-mobile-ng-dialog org-form'
                    });
                };

                if($state.current.name == 'event'){

                    $scope.retrieveEvent = function() {
                        events.show($stateParams.id).success(function(data){
                            $scope.event = data;
                        });
                    };

                    $scope.retrieveEvent();

                    $scope.openRateDialog = function(dj) {
                        ngDialog.open({
                            template: 'organizers/templates/events/rate_dialog.html',
                            controller: ['$scope', 'DjsFactory',
                                function (scope, djs) {

                                    scope.dj = dj;

                                    scope.rate = {
                                        booking_id: scope.dj.booking_id,
                                        dj_id: scope.dj.id
                                    };

                                    scope.cancel = function(){
                                        scope.closeThisDialog()
                                    };

                                    scope.save = function() {
                                        scope.processing = true;
                                        djs.rate(scope.rate)
                                            .success(function() {
                                                scope.processing = false;
                                                scope.closeThisDialog();
                                                $scope.retrieveEvent();
                                            })
                                            .error(function (data) {
                                                scope.validation_errors = data.validation_errors;
                                                scope.processing = false;
                                            });
                                    }

                                }],
                            className: 'ngdialog-theme-default dj-mobile-ng-dialog rate-dialog'
                        })
                    };

                    $scope.djDestroy = function(id, name) {
                        SweetAlert.swal({
                                title: "Artist removing",
                                text: "Remove " + name + " from event?",
                                showCancelButton: true,
                                confirmButtonColor: "#b05dfd", confirmButtonText: "Remove",
                                cancelButtonText: "Cancel",
                                closeOnConfirm: true,
                                closeOnCancel: true
                            },
                            function (isConfirm) {
                                if (isConfirm) {
                                    bookings.destroy(id).success(function () {
                                        $scope.retrieveEvent();
                                    });
                                } else {

                                }
                            }
                        );
                    };
                }
        }])

}());