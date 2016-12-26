(function () {

    "use strict";

    angular.module('ZurealdjAdminApp')
        .controller('WhoWeArePagesController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce', 'SweetAlert', 'WhoWeArePagesFactory',
            function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, SweetAlert, who_we_are_pages) {
                $scope.I18n = I18n;
                $scope._ = _;
                $scope.$state = $state;

                $scope.getHtml = function(html){
                    return $sce.trustAsHtml(html);
                };

                if($state.current.name == 'edit_who_we_are_page'){

                    $scope.who_we_are_page = {};

                    who_we_are_pages.show($stateParams.id)
                        .success(function(data){
                                $timeout(function(){
                                    $scope.who_we_are_page = data.who_we_are_page;
                                }, 0);
                            }
                        );

                    $scope.save = function(){
                        $scope.submitted = true;

                        $scope.formPending = true;
                        who_we_are_pages.upsert($scope.who_we_are_page)
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

                if($state.current.name == 'show_who_we_are_page'){
                    who_we_are_pages.show($stateParams.id).success(function(data){
                        $scope.who_we_are_page = data.who_we_are_page;

                    });
                }
            }])

}());