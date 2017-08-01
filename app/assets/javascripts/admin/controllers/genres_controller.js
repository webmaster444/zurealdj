(function () {

    "use strict";

    angular.module('ZurealdjAdminApp')
        .controller('GenresController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce', 'SweetAlert', 'GenresFactory', 'CountryFlagsFactory',
            function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, SweetAlert, genres, flags) {
                $scope.I18n = I18n;
                $scope._ = _;
                $scope.$state = $state;

                $scope.getHtml = function(html){
                    return $sce.trustAsHtml(html);
                };

                if($state.current.name == 'genres'){
                    $scope.genre = [];
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
                            $scope.retrieveGenres();
                        }, 500)
                    }, true);

                    $scope.page = 1;
                    $scope.retrieveGenres = function(){
                        genres.all({page: $scope.page, query: $scope.filters}).success(function (data) {
                            $scope.genres = data.genres;
                            $scope.count = data.count;

                            var pagination = $('#genres-pagination');
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
                                        $scope.retrieveGenres();
                                    }
                                })
                            }
                        }).error(function (data) {

                        });
                    };

                    $scope.retrieveGenres();

                    $scope.downloadCSV = function () {
                        genres.downloadCSV({query: $scope.filters})
                    }
                }

                $scope.destroy = function(id){
                    var scope = $scope;
                    SweetAlert.swal({
                            title: "Are you sure?",
                            text: "Your will not be able to recover this genres!",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
                            cancelButtonText: "No, cancel plx!",
                            closeOnConfirm: true,
                            closeOnCancel: true,
                            allowOutsideClick: true },
                        function(isConfirm){
                            if (isConfirm) {
                                genres.destroy(id).success(function(){
                                    $scope.retrieveGenres();
                                });
                            } else {

                            }
                        }
                    );
                };

                if($state.current.name == 'new_genre' || $state.current.name == 'edit_genre'){

                    $scope.genre = {};


                    if($state.current.name == 'edit_genre'){
                        genres.show($stateParams.id)
                            .success(function(data){
                                $timeout(function(){
                                    $scope.genre = data.genre;
                                }, 0);
                            }
                        )
                    }

                    $scope.submitGenre = function(){
                        $scope.submitted = true;
                        if($scope.GenreForm.$invalid ){
                            return false;
                        }

                        $scope.formPending = true;
                        genres.upsert($scope.genre)
                            .success(function(){
                                $scope.formPending = false;
                                $state.go('genres')
                            })
                            .error(function(data){
                                $scope.validation_errors = data.errors;
                                $scope.formPending = false;
                            })
                    };
                }

                if($state.current.name == 'show_genre'){
                    genres.show($stateParams.id).success(function(data){
                        $scope.genre = data.genre;

                    });
                }
            }])
}());