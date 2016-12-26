(function () {

    "use strict";

    angular.module('ZurealdjAdminApp')
        .controller('CrewPagesController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce', 'SweetAlert', 'CrewPagesFactory',
            function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, SweetAlert, crew_pages) {
                $scope.I18n = I18n;
                $scope._ = _;
                $scope.$state = $state;

                $scope.getHtml = function(html){
                    return $sce.trustAsHtml(html);
                };

                if($state.current.name == 'edit_crew_page'){

                    $scope.crew_page = {};

                    crew_pages.show($stateParams.id)
                        .success(function(data){
                                $timeout(function(){
                                    $scope.crew_page = data.crew_page;
                                }, 0);
                            }
                        );

                    $scope.save = function(){
                        $scope.submitted = true;

                        $scope.formPending = true;
                        crew_pages.upsert($scope.crew_page)
                            .success(function(){
                                $scope.formPending = false;
                                $state.go('home')
                            })
                            .error(function(data){
                                $scope.validation_errors = data.errors;
                                $scope.formPending = false;
                            })
                    };
                }

                if($state.current.name == 'show_crew_page'){
                    crew_pages.show($stateParams.id).success(function(data){
                        $scope.crew_page = data.crew_page;

                    });
                }
            }])

}());

