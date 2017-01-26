(function () {

    "use strict";

    angular.module('ZurealdjOrganizerApp')
        .controller('EventsController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce',
            'SweetAlert', 'EventsFactory', 'DjsFactory',
            function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, SweetAlert, events, djs) {
                $scope.I18n = I18n;
                $scope._ = _;
                $scope.$state = $state;

                $scope.getHtml = function (html) {
                    return $sce.trustAsHtml(html);
                };

                if($state.current.name == 'events'){

                    $scope.filters = {
                        page: 1,
                        per_page: 10,
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

                    $scope.retrieveEvents = function(){
                        events.all($scope.filters).success(function (data) {
                            if($scope.next_page){
                                $scope.events = $scope.events.concat(data.events);
                                $scope.next_page = false;
                            }
                            else $scope.events = data.events;
                            $scope.count = data.count;

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
                        var count = ($('.event-item').width() - 550) / 90;
                        return count > 4? 4: count;
                    };
                }

                $scope.openEventDialog = function (id) {
                    $state.go('events');
                    ngDialog.open({
                        template: 'organizers/templates/events/form.html',
                        controller: ['$scope', 'EventCategoriesFactory', 'CountryFlagsFactory', 'EventsFactory',
                            function(scope, event_types, flags, events) {

                                scope.save = function () {
                                    $scope.formPending = true;
                                    events.upsert(scope.event)
                                        .success(function () {
                                            scope.formPending = false;
                                            scope.closeThisDialog();
                                            $scope.retrieveEvents()
                                        })
                                        .error(function (data) {
                                            scope.validation_errors = data.validation_errors;
                                            scope.formPending = false;
                                        })
                                };

                                flags.all().success(function(data){
                                    scope.countries = data.flags;
                                });

                                event_types.all().success(function(data){
                                    scope.event_types = data.event_types;
                                });

                                scope.event = {};

                                if(id){
                                    events.show(id).success(function(data){
                                        scope.event = data;
                                    });
                                }

                                scope.cancel = function(){
                                    scope.closeThisDialog()
                                };

                                scope.destroy = function(id) {
                                    SweetAlert.swal({
                                            title: "Are you sure?",
                                            text: "Your will not be able to recover this events!",
                                            type: "warning",
                                            showCancelButton: true,
                                            confirmButtonColor: "#DD6B55", confirmButtonText: "Yes, delete it!",
                                            cancelButtonText: "No, cancel plx!",
                                            closeOnConfirm: true,
                                            closeOnCancel: true,
                                            allowOutsideClick: true
                                        },
                                        function (isConfirm) {
                                            if (isConfirm) {
                                                events.destroy(id).success(function () {
                                                    scope.closeThisDialog();
                                                    $scope.retrieveEvents();
                                                });
                                            } else {

                                            }
                                        }
                                    );
                                };
                            }],
                        className: 'ngdialog-theme-default dj-mobile-ng-dialog'
                    });
                };

                if($state.current.name == 'event'){
                    events.show($stateParams.id).success(function(data){
                        $scope.event = data;
                    });

                    $scope.rate = function(dj){
                        djs.rate(dj.id, dj.rating)
                    };

                    var favorites_timer = false;

                    $scope.removeFromFavorites = function(dj){
                        if(favorites_timer){
                            $timeout.cancel(favorites_timer)
                        }
                        favorites_timer = $timeout(function(){
                            djs.removeFromFavorites(dj.dj_id)
                                .success(function(){
                                    dj.in_favorites = false;
                                })
                        }, 500)
                    };

                    $scope.addToFavorites = function(dj){
                        if(favorites_timer){
                            $timeout.cancel(favorites_timer)
                        }
                        favorites_timer = $timeout(function(){
                            djs.addToFavorites(dj.dj_id)
                                .success(function(){
                                    dj.in_favorites = true;
                                })
                        }, 500)
                    };
                }
        }])

}());