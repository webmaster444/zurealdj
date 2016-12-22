(function () {

    "use strict";

    angular.module('ZurealdjDjApp')
        .controller('StepPersonalUrlController', ['$scope', '$state', 'UsersFactory',
            function ($scope, $state, users) {

                $scope.I18n = I18n;
                users.profile().success(function(data){
                    $scope.user = data;
                });

                $scope.next = function(){
                    users.submit_personal_url($scope.user)
                        .success(function(data){
                            if(data.next_step == 'completed'){
                                $state.go('profile')
                            }else{
                                $state.go('step_' + data.next_step);
                            }
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