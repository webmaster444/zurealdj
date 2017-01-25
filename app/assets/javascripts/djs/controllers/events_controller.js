(function () {

    "use strict";

    angular.module('ZurealdjDjApp')
        .controller('EventsController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce', 'SweetAlert', 'EventsFactory',
            function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, SweetAlert, events) {
                $scope.I18n = I18n;
                $scope._ = _;
                $scope.$state = $state;

                $scope.getHtml = function(html){
                    return $sce.trustAsHtml(html);
                };

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


                if($state.current.name == 'show_event'){
                    events.show($stateParams.id).success(function(data){
                        $scope.event = data;
                    });
                }
            }])

}());