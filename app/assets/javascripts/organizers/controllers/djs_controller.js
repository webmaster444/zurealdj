(function () {

    "use strict";

    angular.module('ZurealdjOrganizerApp')
        .controller('DjsController', ['$scope', '$state', 'ngDialog', '$stateParams', 'SweetAlert', 'DjsFactory', '$timeout',
            function ($scope, $state, ngDialog, $stateParams, SweetAlert, djs, $timeout) {
                $scope.I18n = I18n;
                $scope._ = _;
                $scope.$state = $state;
                $scope.$parent.no_second_navbar = false;

                if($state.current.name == 'djs'){
                    $scope.dj = [];

                    $scope.resetFilters = function(){
                        $scope.filters = {
                            page: 1,
                            per_page: 10
                        };
                    };
                    $scope.resetFilters();

                    var timer = false;
                    $scope.$watch('filters', function(){
                        if(timer){
                            $scope.filters.page = 1;
                            $timeout.cancel(timer)
                        }
                        timer= $timeout(function(){
                            if($scope.filters.page > Math.ceil($scope.count / $scope.filters.per_page)) $scope.filters.page = 1;
                            $scope.retrieveDjs();
                        }, 500)
                    }, true);

                    $scope.retrieveDjs = function(){
                        djs.all($scope.filters).success(function (data) {
                            $scope.djs = data.djs;
                            $scope.count = data.count;

                            var pagination = $('#djs-pagination');
                            pagination.empty();
                            pagination.removeData('twbs-pagination');
                            pagination.unbind('page');

                            if($scope.count > 0){
                                pagination.twbsPagination({

                                    totalPages: Math.ceil($scope.count / $scope.filters.per_page),
                                    startPage: $scope.filters.page,

                                    visiblePages: 9,
                                    onPageClick: function (event, page) {
                                        $scope.filters.page = page;
                                        $scope.retrieveDjs();
                                    }
                                })
                            }
                        }).error(function (data) {

                        });
                    };

                    $scope.retrieveDjs();

                    $scope.rate = function(dj){
                        djs.rate(dj.dj_id, dj.rating)
                            .success(function(data){

                            })
                            .error(function(data){

                            });
                    }
                }

                if($state.current.name == 'show_dj'){
                    djs.show($stateParams.id).success(function(data){
                        $scope.dj = data.dj;

                    });
                }
            }])

}());