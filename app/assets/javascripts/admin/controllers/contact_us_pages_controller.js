(function () {

    "use strict";

    angular.module('ZurealdjAdminApp')
        .controller('ContactUsPagesController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce', 'SweetAlert', 'ContactUsPagesFactory',
            function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, SweetAlert, pages_factory) {
                $scope.I18n = I18n;
                $scope._ = _;
                $scope.$state = $state;

                $scope.getHtml = function(html){
                    return $sce.trustAsHtml(html);
                };

                if($state.current.name == 'edit_contact_us_page'){

                    $scope.page = {};

                    pages_factory.show($stateParams.id)
                        .success(function(data){
                                $timeout(function(){
                                    $scope.page = data.page;
                                }, 0);
                            }
                        );

                    $scope.save = function(){
                        $scope.submitted = true;

                        $scope.formPending = true;
                        pages_factory.upsert($scope.page)
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