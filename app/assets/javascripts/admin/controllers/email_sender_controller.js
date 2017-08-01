(function () {

    "use strict";

    angular.module('ZurealdjAdminApp')
        .controller('EmailSenderController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce', 'SweetAlert', 'EmailSenderFactory',
            function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, SweetAlert, email_sender) {
                $scope.I18n = I18n;
                $scope._ = _;
                $scope.$state = $state;

                $scope.email_sender = {};
                $scope.validation_errors = {};

                email_sender.show()
                    .success(function(data){
                        $timeout(function(){
                            $scope.email_sender = data.email_sender;
                        }, 0);
                    }
                );

                $scope.$watch('email_sender', function(new_value, old_value){
                    for(var key in $scope.email_sender) {

                        if(new_value[key] != old_value[key])
                            $scope.validation_errors[key] = null;
                    }
                }, true);

                $scope.save = function(){
                    $scope.submitted = true;
                    $scope.pending = true;
                    email_sender.update($scope.email_sender)
                        .success(function(){
                            $scope.pending = false;
                        })
                        .error(function(data){
                            $scope.validation_errors = data.validation_errors;
                            $scope.pending = false;
                        })
                };

            }])

}());