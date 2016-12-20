(function () {

    "use strict";

    angular.module('ZurealdjDjApp')
        .controller('EventsController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce', 'SweetAlert', 'EventsFactory', 'CountryFlagsFactory',
            function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, SweetAlert, events, flags) {
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

                if($state.current.name == 'events'){
                    $scope.event = [];

                    var timer = false;
                    $scope.$watch('filters', function(){
                        if(timer){
                            $timeout.cancel(timer)
                        }
                        timer= $timeout(function(){
                            $scope.retrieveEvents();
                        }, 500)
                    }, true);

                    $scope.page = 1;
                    $scope.retrieveEvents = function(){
                        events.all({page: $scope.page, query: $scope.filters}).success(function (data) {
                            $scope.events = data.events;
                            $scope.count = data.count;

                            var pagination = $('#events-pagination');
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
                                        $scope.retrieveEvents();
                                    }
                                })
                            }
                        }).error(function (data) {

                        });
                    };

                    $scope.retrieveEvents();
                }

                $scope.destroy = function(id){
                    var scope = $scope;
                    SweetAlert.swal({
                            title: "Are you sure?",
                            text: "Your will not be able to recover this events!",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
                            cancelButtonText: "No, cancel plx!",
                            closeOnConfirm: true,
                            closeOnCancel: true,
                            allowOutsideClick: true },
                        function(isConfirm){
                            if (isConfirm) {
                                events.destroy(id).success(function(){
                                    $scope.retrieveEvents();
                                });
                            } else {

                            }
                        }
                    );
                };

                if($state.current.name == 'new_event' || $state.current.name == 'edit_event'){

                    $scope.event = {};


                    if($state.current.name == 'edit_event'){
                        events.show($stateParams.id)
                            .success(function(data){
                                $timeout(function(){
                                    $scope.event = data.event;
                                }, 0);
                            }
                        )
                    }

                    $scope.submitEvent = function(){
                        $scope.submitted = true;
                        if($scope.EventForm.$invalid ){
                            return false;
                        }

                        $scope.formPending = true;
                        events.upsert($scope.event)
                            .success(function(){
                                $scope.formPending = false;
                                $state.go('events')
                            })
                            .error(function(data){
                                $scope.validation_errors = data.errors;
                                $scope.formPending = false;
                            })
                    };
                }

                if($state.current.name == 'show_event'){
                    events.show($stateParams.id).success(function(data){
                        $scope.event = data.event;

                    });
                }
            }])

}());