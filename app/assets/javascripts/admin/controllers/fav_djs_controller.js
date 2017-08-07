(function () {

    "use strict";

    angular.module('ZurealdjAdminApp')
        .controller('FavDjsController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce', 'SweetAlert', 'DjsFactory', 'FavDjsFactory',
            function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, SweetAlert, djs, fav_djs ) {
                $scope.I18n = I18n;
                $scope._ = _;
                $scope.$state = $state;
                $scope.fav_dj = {id: "-1"};

                $scope.getHtml = function(html){
                    return $sce.trustAsHtml(html);
                };

                if($state.current.name == 'fav_djs'){
                    $scope.fav_dj = [];
                    $scope.resetFilters = function(){
                        $scope.filters = {
                            per_page: 10
                        };
                    };
                    $scope.resetFilters();
                    $scope.new = true;

                    var timer = false;
                    $scope.$watch('filters', function(){
                        if(timer){
                            $timeout.cancel(timer)
                        }
                        timer= $timeout(function(){
                            if($scope.page > Math.ceil($scope.count / $scope.filters.per_page)) $scope.page = 1;
                            $scope.retrieveFavDjs();
                        }, 500)
                    }, true);

                    $scope.page = 1;
                    $scope.retrieveFavDjs = function(){
                        fav_djs.all({page: $scope.page, query: $scope.filters}).success(function (data) {

                            $scope.fav_djs = data.fav_djs;
                            $scope.count = data.count;

                            var pagination = $('#fav_djs-pagination');
                            pagination.empty();
                            pagination.removeData('twbs-pagination');
                            pagination.unbind('page');

                            if($scope.count > 0){
                                pagination.twbsPagination({
                                    totalPages: Math.ceil($scope.count / $scope.filters.per_page),
                                    startPage: $scope.page,
                                    visiblePages: 9,
                                    onPageClick: function (event, page) {
                                        $scope.page = page;
                                        $scope.retrieveFavDjs();
                                    }
                                })
                            }
                        }).error(function (data) {

                        });
                    };

                    $scope.retrieveFavDjs();

                    $scope.downloadCSV = function () {
                        fav_djs.downloadCSV({query: $scope.filters})
                    }
                }

                $scope.destroy = function(id){
                    var scope = $scope;
                    SweetAlert.swal({
                            title: "Are you sure?",
                            text: "Your will not be able to recover this fav_djs!",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
                            cancelButtonText: "No, cancel plx!",
                            closeOnConfirm: true,
                            closeOnCancel: true,
                            allowOutsideClick: true },
                        function(isConfirm){
                            if (isConfirm) {
                                fav_djs.destroy(id).success(function(){
                                    $scope.retrieveFavDjs();
                                });
                            } else {

                            }
                        }
                    );
                };

                if($state.current.name == 'new_fav_dj' || $state.current.name == 'edit_fav_dj'){

                    if($state.current.name == 'new_fav_dj'){
                        djs.all({}).success(function(data){
                            $scope.djs = [{name: I18n.t('fav_dj.fields.select_an_dj'), id: ''}].concat(data.djs);
                            $scope.fav_dj = $scope.djs[0];
                        });
                    }

                    if($state.current.name == 'edit_fav_dj'){
                        djs.all({}).success(function(data){
                            $scope.djs = [{name: I18n.t('fav_dj.fields.select_an_dj'), id: ''}].concat(data.djs);
                        });

                        fav_djs.show($stateParams.id)
                            .success(function(data){
                                $timeout(function(){
                                    $scope.fav_dj = data.fav_dj;
                                }, 0);
                            }
                        )
                    }

                    $scope.submitFavDj = function(){
                        $scope.submitted = true;
                        if($scope.FavDjForm.$invalid ){
                            return false;
                        }

                        $scope.formPending = true;
                        fav_djs.upsert($scope.fav_dj)
                            .success(function(){
                                $scope.formPending = false;
                                $state.go('fav_djs')
                            })
                            .error(function(data){
                                $scope.validation_errors = data.errors;
                                $scope.formPending = false;
                            })
                    };
                }

                if($state.current.name == 'show_fav_dj'){
                    fav_djs.show($stateParams.id).success(function(data){
                        $scope.fav_dj = data.fav_dj;
                    });
                }
            }])

}());