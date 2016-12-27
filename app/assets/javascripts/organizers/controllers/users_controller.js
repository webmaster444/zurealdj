(function () {

    "use strict";

    angular.module('ZurealdjOrganizerApp')
        .controller('UsersController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce', 'UsersFactory',
            'CountryFlagsFactory',
        function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, users, countries) {
            $scope.I18n = I18n;
            $scope._ = _;
            $scope.$state = $state;
            $scope.$parent.no_second_navbar = false;

            $scope.user = {};

            users.profile().success(function(data){
                $scope.user = data;
            });

            countries.all().success(function(data){
                $scope.countries = data.flags;
            });

            $scope.save = function(){
                $scope.processing = true;
                users.save($scope.user)
                    .success(function(){
                        $state.go('profile');
                        $scope.processing = false;
                    })
                    .error(function(data){
                        $scope.processing = false;
                    })
            }
        }])
}());