(function () {

    "use strict";

    angular.module('ZurealdjDjApp')
        .controller('StepGenresController', ['$scope', '$state', 'GenresFactory', 'UsersFactory',
            function ($scope, $state, genres, users) {

                $scope.I18n = I18n;
                $scope.$parent.no_second_navbar = true;
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