(function () {

    "use strict";

    angular.module('ZurealdjDjApp')
        .controller('UsersController', ['$scope', '$state', 'ngDialog', '$stateParams', 'UsersFactory',
            'CountryFlagsFactory',
        function ($scope, $state, ngDialog, $stateParams, users, countries) {
            $scope.I18n = I18n;
            $scope._ = _;
            $scope.$state = $state;
            $scope.$parent.no_second_navbar = false;

            $scope.step = false;

            $scope.isMobile = function(){
                return window.navigator.userAgent.match(/iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile/i)? true: false;
            };

            $scope.user = {};

            users.profile().success(function(data){
                $scope.user = data;
                $scope.$parent.$current_user = $scope.user;
                $scope.sample = {
                    url: $scope.user.sample_url,
                    name: $scope.user.sample_title
                };
            });

            $scope.comment_options = {
                page: 1,
                per_page: 10
            };

            $scope.comments = [];

            $scope.retrieveComments = function() {
                users.comments($scope.comment_options).success(function(data){
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

            countries.all().success(function(data){
                $scope.countries = data.flags;
            });

            $scope.save = function(){
                if($scope.sample.new) $scope.user.sample = $scope.sample.new;
                $scope.user.sample_title = $scope.sample.name;
                $scope.processing = true;
                users.save($scope.user)
                    .success(function(){
                        $state.go('profile');
                        $scope.processing = false;
                    })
                    .error(function(data){
                        $scope.processing = false;
                        $scope.validation_errors = data.validation_errors;
                    })
            };
        }])
}());