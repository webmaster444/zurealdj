(function () {

    "use strict";

    angular.module('ZurealdjOrganizerApp')
        .controller('StepEventTypesController', ['$scope', '$state', 'EventCategoriesFactory', 'UsersFactory',
            function ($scope, $state, event_types, users) {

                $scope.I18n = I18n;
                $scope.$parent.no_second_navbar = true;
                event_types.all().success(function(data){
                    $scope.event_types = data.event_types;
                });

                $scope.next = function(){
                    users.submit_event_types($scope.event_types)
                        .success(function(data){
                            $state.go('step_' + data.next_step);
                        })
                        .error(function(data){
                            $scope.validation_errors = data.validation_errors;
                        });
                }
            }])
}());