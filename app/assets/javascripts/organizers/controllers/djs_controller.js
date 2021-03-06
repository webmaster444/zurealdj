(function () {

    "use strict";

    angular.module('ZurealdjOrganizerApp')
        .controller('DjsController', ['$scope', '$state', 'ngDialog', '$stateParams', 'SweetAlert', 'DjsFactory', '$timeout',
            'EventCategoriesFactory', 'GenresFactory', '$sce', 'BookingsFactory',
            function ($scope, $state, ngDialog, $stateParams, SweetAlert, djs, $timeout, event_types, genres, $sce, bookings) {
                $scope.I18n = I18n;
                $scope._ = _;
                $scope.$state = $state;
                $scope.$parent.no_second_navbar = false;

                if($state.current.name == 'djs'){

                    $scope.slider = {
                        default: true,
                        value: 0,
                        options: {
                            floor: 0,
                            ceil: 1000,
                            step: 1,
                            showSelectionBar: true,
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

                    $scope.isOpen = function(){
                        setTimeout(function() {
                            $scope.$broadcast('rzSliderForceRender');
                        }, 100);
                    };

                    $scope.filters = {
                        page: 1,
                        per_page: 12,
                        price_from: 0,
                        price_to: 3000
                    };

                    $scope.filtersDialog = function(){
                        ngDialog.open({
                            template: 'organizers/templates/common/filters.html',
                            className: 'ngdialog-theme-default dj-mobile-ng-dialog',
                            scope: $scope
                        });
                    };

                    $scope.closeFilterDialog = ngDialog.closeAll;

                    $scope.next_page = false;

                    event_types.all().success(function(data){
                        $scope.filters.event_types = data.event_types;
                    });

                    genres.all().success(function(data){
                        $scope.filters.genres = data.genres;
                    });

                    $scope.dj = [];

                    $scope.resetPriceFilter = function() {
                        $scope.filters.price_from = $scope.min_rate;
                        $scope.filters.price_to = $scope.max_rate;
                    };

                    $scope.resetFilters = function(){
                        $scope.filters = {
                            page: 1,
                            per_page: 12,
                            price_from: $scope.min_rate,
                            price_to: $scope.max_rate,
                            genres: _.map($scope.filters.genres, function(i){ i.checked = false; return i; }),
                            event_types: _.map($scope.filters.event_types, function(i){ i.checked = false; return i;})
                        };
                    };

                    $scope.checkPriceFilter = function() {
                        return $scope.filters.price_from != $scope.min_rate || $scope.filters.price_to != $scope.max_rate
                    };

                    $scope.checkSelectedFilters = function() {
                        if($scope.checkPriceFilter()) return true;
                        for(var i = 0; $scope.filters.genres && i < $scope.filters.genres.length; i++)
                            if($scope.filters.genres[i].checked) return true;
                        for(var i = 0; $scope.filters.event_types && i < $scope.filters.event_types.length; i++)
                            if($scope.filters.event_types[i].checked) return true;

                        return false
                    };

                    var timer = false;
                    $scope.$watch('filters', function(){
                        if(timer){
                            if(!$scope.next_page) $scope.filters.page = 1;
                            $timeout.cancel(timer);
                        }
                        timer = $timeout(function(){
                            $scope.retrieveDjs();
                        }, 500);
                    }, true);

                    $scope.retrieveDjs = function(){
                        djs.all($scope.filters).success(function (data) {
                            if($scope.next_page){
                                $scope.djs = $scope.djs.concat(data.djs);
                                $scope.next_page = false;
                            }
                            else $scope.djs = data.djs;
                            $scope.count = data.count;

                            if($scope.slider.default){
                                $scope.min_rate = data.min_rate;
                                $scope.max_rate = data.max_rate;
                                $scope.slider.options.ceil = $scope.max_rate;
                                $scope.slider.value = $scope.max_rate;
                                $scope.slider.default = false;
                                $scope.filters.price_from = $scope.min_rate;
                                $scope.filters.price_to = $scope.max_rate;
                            }


                        }).error(function (data) {

                        });
                    };

                    $scope.retrieveDjs();

                    $scope.showMore = function(){
                        if($scope.djs.length < $scope.count){
                            $scope.next_page = true;
                            ++$scope.filters.page;
                        }
                    };
                }

                if($state.current.name == 'dj'){
                    djs.show($stateParams.id).success(function(data){
                        $scope.user = data;
                    })
                    .error(function (data) {
                        if(data.redirect_url){
                            $state.go('djs');
                        }
                    });

                    $scope.book = function(){
                        ngDialog.open({
                            template: 'organizers/templates/bookings/form.html',
                            className: 'ngdialog-theme-default dj-mobile-ng-dialog org-form',
                            controller: 'BookingsController',
                            scope: $scope
                        });
                    };

                    $scope.comment_options = {
                        page: 1,
                        per_page: 10
                    };

                    $scope.comments = [];

                    $scope.retrieveComments = function() {
                        djs.comments($scope.comment_options, $stateParams.id).success(function(data){
                            $scope.comments = $scope.comments.concat(data.comments);
                            $scope.comments_count = data.count;
                        });
                    };

                    $scope.retrieveComments();

                    $scope.showMore = function() {
                        if($scope.comments_count > $scope.comments.length){
                            $scope.comment_options.page += 1;
                            $scope.retrieveComments();
                        }
                    };
                }

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
            }])

}());