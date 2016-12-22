(function () {

    "use strict";

    angular.module('ZurealdjDjApp')
        .controller('StepEquipmentsController', ['$scope', '$state', 'EquipmentsFactory', 'UsersFactory',
            function ($scope, $state, equipments, users) {

                $scope.I18n = I18n;
                equipments.all().success(function(data){
                    $scope.equipments = data.equipments;
                });

                $scope.next = function(){
                    users.submit_equipments($scope.equipments)
                        .success(function(data){
                            $state.go('step_' + data.next_step);
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