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

            $scope.user = {};

            users.profile().success(function(data){
                $scope.user = data;
                $scope.$parent.$current_user = $scope.user;
                $scope.sample = {
                    url: $scope.user.sample_url,
                    name: $scope.user.sample_file
                };
            });

            countries.all().success(function(data){
                $scope.countries = data.flags;
            });

            $scope.save = function(){
                if($scope.sample.new) $scope.user.sample = $scope.sample.new;
                $scope.processing = true;
                users.save($scope.user)
                    .success(function(){
                        $state.go('profile');
                        $scope.processing = false;
                    })
                    .error(function(data){
                        $scope.processing = false;
                    })
            };
        }])
}());