(function () {

    "use strict";

    angular.module('ZurealdjAdminApp')
        .controller('CancelationsPagesController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce', 'SweetAlert', 'CancelationsPagesFactory',
            function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, SweetAlert, cancelations_pages) {
                $scope.I18n = I18n;
                $scope._ = _;
                $scope.$state = $state;

                $scope.getHtml = function(html){
                    return $sce.trustAsHtml(html);
                };

                if($state.current.name == 'edit_cancelations_page'){

                    $scope.cancelations_page = {};

                    cancelations_pages.show($stateParams.id)
                        .success(function(data){
                                $timeout(function(){
                                    $scope.cancelations_page = data.cancelations_page;
                                }, 0);
                            }
                        );

                    $scope.save = function(){
                        $scope.submitted = true;

                        $scope.formPending = true;
                        cancelations_pages.upsert($scope.cancelations_page)
                            .success(function(){
                                $scope.formPending = false;
                                $state.go($state.current.name)
                            })
                            .error(function(data){
                                $scope.validation_errors = data.errors;
                                $scope.formPending = false;
                            })
                    };
                }
            }])

}());