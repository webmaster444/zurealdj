(function () {

    "use strict";

    angular.module('ZurealdjDjApp')
        .controller('StepCancelationsController', ['$scope', '$state', 'UsersFactory',
            function ($scope, $state,  users) {

                $scope.I18n = I18n;
                $scope.$parent.no_second_navbar = true;
                users.profile().success(function(data){
                    $scope.user = data;
                });

                $scope.next = function(){
                   users.submit_cancelations($scope.user)
                        .success(function(data){
                            $state.go('profile')
                        })
                        .error(function(data){
                            $scope.validation_errors = data.validation_errors;
                        });
                };

                $scope.back = function(){
                    users.step_back().success(function(response){
                        $state.go('step_' + response.step);
                    });
                }
            }])
}());