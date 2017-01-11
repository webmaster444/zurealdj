(function () {

    "use strict";

    angular.module('ZurealdjOrganizerApp')
        .controller('FavoritesController', ['$scope', '$state', 'ngDialog', '$stateParams', 'SweetAlert', 'DjsFactory',
            '$timeout', 'EventCategoriesFactory', 'GenresFactory', '$sce',
            function ($scope, $state, ngDialog, $stateParams, SweetAlert, djs, $timeout, event_types, genres, $sce) {
                $scope.I18n = I18n;
                $scope._ = _;
                $scope.$state = $state;

                $scope.slider = {
                    options: {
                        floor: 0,
                        ceil: 1000,
                        step: 1,
                        translate: function(value, sliderId, label) {
                            switch (label) {
                                case 'model':
                                    return '';
                                case 'high':
                                    return '';
                                default:
                                    return ''
                            }
                        }
                    }
                };

                $scope.filters = {
                    page: 1,
                    per_page: 10,
                    price_from: 0,
                    price_to: 1000,
                    favorite: true
                };

                event_types.all().success(function(data){
                    $scope.filters.event_types = data.event_types;
                });

                genres.all().success(function(data){
                    $scope.filters.genres = data.genres;
                });

                $scope.dj = [];
                $scope.search_count = 0;

                $scope.resetFilters = function(){
                    $scope.filters = {
                        page: 1,
                        per_page: 10,
                        price_from: 0,
                        price_to: 1000,
                        genres: _.map($scope.filters.genres, function(i){ i.checked = false; return i;}),
                        event_types: _.map($scope.filters.event_types, function(i){ i.checked = false; return i;}),
                        favorite: true
                    };
                };

                var timer = false;
                $scope.$watch('filters', function(){
                    if(timer){
                        $scope.filters.page = 1;
                        $timeout.cancel(timer)
                    }
                    timer = $timeout(function(){
                        if($scope.filters.page > Math.ceil($scope.count / $scope.filters.per_page))
                            $scope.filters.page = 1;
                        $scope.retrieveDjsCount();
                    }, 500)
                }, true);

                $scope.retrieveDjsCount = function(){
                    djs.all($scope.filters).success(function (data) {
                        $scope.search_count = data.count;
                    });
                };

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
                };

                var favorites_timer = false;

                $scope.removeFromFavorites = function(dj){
                    if(favorites_timer){
                        $timeout.cancel(favorites_timer)
                    }
                    favorites_timer = $timeout(function(){
                        djs.removeFromFavorites(dj.dj_id)
                            .success(function(){
                                $scope.retrieveDjs()
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

            }])

}());