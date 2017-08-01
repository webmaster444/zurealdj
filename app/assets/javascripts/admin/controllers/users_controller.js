(function () {

    "use strict";

    angular.module('ZurealdjAdminApp')
        .controller('UsersController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce', 'UsersFactory',
        function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, users) {
            $scope.I18n = I18n;
            $scope._ = _;
            $scope.$state = $state;

            $scope.admin = {};

            if($state.current.name == 'profile'){
                users.myProfile()
                    .success(function(data){
                            $scope.admin = data.admin;
                        })
            }

            $scope.submit = function(){
                $scope.processing = true;

                    users.updateMyProfile($scope.admin)
                        .success(function(){
                            $scope.processing = false;
                        })
                        .error(function(data){
                            $scope.validation_errors = data.validation_errors;
                            $scope.processing = false;
                        })


            };
        }])
}());