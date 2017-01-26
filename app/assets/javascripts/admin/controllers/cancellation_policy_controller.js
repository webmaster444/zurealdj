(function () {

    "use strict";

    angular.module('ZurealdjAdminApp')
        .controller('CancellationPolicyController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce', 'SweetAlert', 'CancellationPolicyFactory',
            function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, SweetAlert, cancellation_policy) {
                $scope.I18n = I18n;
                $scope._ = _;
                $scope.$state = $state;

                $scope.getHtml = function(html){
                    return $sce.trustAsHtml(html);
                };

                if($state.current.name == 'edit_cancellation_policy'){

                    $scope.cancellation_policy = {};

                        cancellation_policy.show($stateParams.id)
                            .success(function(data){
                                    $scope.cancellation_policy = data.cancellation_policy;
                            }
                        );

                    $scope.save = function(){
                        $scope.submitted = true;

                        $scope.formPending = true;
                        cancellation_policy.upsert($scope.cancellation_policy)
                            .success(function(){
                                $scope.formPending = false;
                            })
                            .error(function(data){
                                $scope.validation_errors = data.errors;
                                $scope.formPending = false;
                            })
                    };
                }
            }])

}());