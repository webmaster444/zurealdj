(function () {

    "use strict";

    angular.module('ZurealdjAdminApp')
        .controller('HowWeWorkPagesController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce', 'SweetAlert', 'HowWeWorkPagesFactory',
            function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, SweetAlert, how_we_work_pages) {
                $scope.I18n = I18n;
                $scope._ = _;
                $scope.$state = $state;

                $scope.getHtml = function(html){
                    return $sce.trustAsHtml(html);
                };

                if($state.current.name == 'edit_how_we_work_page'){

                    $scope.how_we_work_page = {};

                    how_we_work_pages.show($stateParams.id)
                        .success(function(data){
                                $timeout(function(){
                                    $scope.how_we_work_page = data.how_we_work_page;
                                }, 0);
                            }
                        );

                    $scope.save = function(){
                        $scope.submitted = true;

                        $scope.formPending = true;
                        how_we_work_pages.upsert($scope.how_we_work_page)
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
            }])

}());

