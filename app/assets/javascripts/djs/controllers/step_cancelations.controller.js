(function () {

    "use strict";

    angular.module('ZurealdjDjApp')
        .controller('StepCancelationsController', ['$scope', '$state', 'CancelationsFactory', 'UsersFactory',
            function ($scope, $state, cancelations, users) {

                $scope.I18n = I18n;
                $scope.$parent.no_second_navbar = true;
                cancelations.all().success(function(data){
                    $scope.cancelations = data.cancelations;
                });
                users.profile().success(function(data){
                    $scope.user = data;
                });

                $scope.next = function(){
                    users.submit_cancelations($scope.user, $scope.cancelations)
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