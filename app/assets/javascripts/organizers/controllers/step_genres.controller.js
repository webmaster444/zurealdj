(function () {

    "use strict";

    angular.module('ZurealdjOrganizerApp')
        .controller('StepGenresController', ['$scope', '$state', 'GenresFactory', 'UsersFactory',
            function ($scope, $state, genres, users) {

                $scope.I18n = I18n;
                genres.all().success(function(data){
                    $scope.genres = data.genres;
                });

                $scope.next = function(){
                    users.submit_genres($scope.genres)
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