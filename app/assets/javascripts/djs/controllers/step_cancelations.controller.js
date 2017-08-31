(function () {

    "use strict";

    angular.module('ZurealdjDjApp')
        .controller('StepCancelationsController', ['$scope', '$state', 'UsersFactory', 'ngDialog',
            function ($scope, $state,  users, ngDialog) {

                $scope.I18n = I18n;
                $scope.$parent.no_second_navbar = true;
                users.step_data().success(function(data){
                    $scope.user = data;
                });

                $scope.next = function(){
                   users.submit_cancelations($scope.user)
                        .success(function(data){
                            $scope.$parent.retrieveCurrentUser();
                            $state.go('profile')
                        })
                        .error(function(data){
                            $scope.validation_errors = data.validation_errors;
                        });
                };

                $scope.back = function(){
                    users.step_back().success(function(response){
                        $state.go('step_' + response.step);
                    });
                };

                $scope.policyDialog = function () {
                    ngDialog.open({
                        template: 'djs/templates/steps/cancellation_details.html',
                        controller: ['$scope', 'UsersFactory', '$sce',
                            function(scope, usersFact, $sce) {
                                $scope.showpolicy = function(){
                                    users.policy().success(function(data){
                                        scope.page =  $sce.trustAsHtml(data.page);
                                    });
                                };
                                $scope.showpolicy();
                                scope.cancel = function(){
                                    scope.closeThisDialog()
                                };
                                scope.accept = function(){
                                    $scope.user.agree = true;
                                    scope.closeThisDialog()
                                };
                            }],
                        className: 'ngdialog-theme-default dj-mobile-ng-dialog org-form'
                    });
                };
            }])
}());