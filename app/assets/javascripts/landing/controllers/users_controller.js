(function () {

    "use strict";

    angular.module('ZurealdjLandingApp')
        .controller('UsersController', ['$scope', '$state', 'ngDialog', 'UsersFactory', 'SweetAlert',
            function ($scope, $state, ngDialog, users, SweetAlert) {
                $scope.I18n = I18n;
                $scope._ = _;
                $scope.$state = $state;

                $scope.submit = function(){
                    $scope.processing = true;
                    users.create($scope.user)
                        .success(function(data){
                            $scope.processing = false;
                            ngDialog.closeAll();

                            SweetAlert.swal("Good job!", data.message, "success");

                        })
                        .error(function(){

                            $scope.processing = false;
                        })
                }
            }])
}());