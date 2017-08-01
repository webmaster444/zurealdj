(function () {

    "use strict";

    angular.module('ZurealdjAdminApp')
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

                if($state.current.name == 'events'){

                    $scope.resetFilters = function(){
                        $scope.page = 1;
                        $scope.filters = {
                            per_page: 10
                        };
                    };

                    $scope.resetFilters();

                    $scope.events = [];

                    var timer = false;
                    $scope.$watch('filters', function(){
                        if(timer){
                            $scope.page = 1;
                            $timeout.cancel(timer)
                        }
                        timer= $timeout(function(){
                            $scope.retrieveEvents();
                        }, 500)
                    }, true);

                    $scope.$watch('page', function(){
                        if(timer){
                            $timeout.cancel(timer)
                        }
                        timer= $timeout(function(){
                            $scope.retrieveEvents();
                        }, 500)
                    });

                    $scope.retrieveEvents = function(){
                        events.all($scope.filters, $scope.page).success(function (data) {
                            $scope.events = data.events;
                            $scope.total = data.count;
                        }).error(function (data) {

                        });
                    };

                    $scope.retrieveEvents();

                    $scope.downloadCSV = function(){
                        events.downloadCSV({query: $scope.filters})
                    }
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

                if($state.current.name == 'show_event'){
                    events.show($stateParams.id).success(function(data){
                        $scope.event = data.event;

                    });
                }
            }])
}());