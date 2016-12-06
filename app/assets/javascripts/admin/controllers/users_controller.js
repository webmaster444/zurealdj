(function () {

    "use strict";

    angular.module('ZurealdjAdminApp')
        .controller('UsersController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce', 'UsersFactory',
        function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, users) {
            $scope.I18n = I18n;
            $scope._ = _;
            $scope.$state = $state;

            $scope.session = {
                per_page: 10
            };

            $scope.$watch('current_user', function() {
                $scope.user = $scope.current_user;
            });

            $scope.submit = function(){
                if($scope.currentUserForm.$invalid ){
                    return false;
                }

                $scope.processing = true;
                users.upsert($scope.user)
                        .success(function(){

                        })
                        .error(function(data){

                        })
            };
        }])
}());