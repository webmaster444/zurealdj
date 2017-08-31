(function () {

    "use strict";

    angular.module('ZurealdjOrganizerApp')
        .controller('UsersController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce', 'UsersFactory',
            'CountryFlagsFactory', 'SweetAlert',
        function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, users, countries, SweetAlert) {
            $scope.I18n = I18n;
            $scope._ = _;
            $scope.$state = $state;
            $scope.$parent.no_second_navbar = false;

            $scope.step = false;

            $scope.isMobile = function(){
                return window.navigator.userAgent.match(/iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile/i)? true: false;
            };

            $scope.user = {};
            var userOriginalData = {};

            $scope.aboutText = function () {
                var o = document.getElementById('aboutId');
                o.style.height = "1px";
                o.style.height = (25+o.scrollHeight)+"px";
                o.style.borderRadius = "30px";
            };

            $scope.$watch(function () {
                var el = document.getElementById('aboutId');
                if(el){
                    return el.value.length
                } else {
                    return 0
                }

            }, function(newValue, oldValue) {
                if (newValue > 0) {
                    $scope.aboutText();
                }
            });

            users.profile().success(function(data){
                $scope.user = data;
                userOriginalData = _.clone($scope.user);


            });

            countries.all().success(function(data){
                $scope.countries = data.flags;
            });

            $scope.save = function(){
                $scope.processing = true;
                users.save($scope.user)
                    .success(function(){
                        $scope.openConfirm = false;
                        $state.go('profile');
                        $scope.processing = false;
                        $scope.$parent.retrieveCurrentUser();
                    })
                    .error(function(data){
                        $scope.processing = false;
                        $scope.validation_errors = data.validation_errors
                    })
            };



            $scope.openConfirm = true;

            if($state.current.name == 'edit_profile'){



                $scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                    if(!_.isEqual(userOriginalData, $scope.user)) {
                        if ($scope.openConfirm) {
                            event.preventDefault();
                            $scope.openConfirm = false;
                            SweetAlert.swal({
                                    title: "Leave page",
                                    text: "You have data that has not been saved yet. You will loose it if you leave the page.",
                                    showCancelButton: true,
                                    confirmButtonColor: "#b05dfd", confirmButtonText: "Agree",
                                    cancelButtonText: "Cancel",
                                    closeOnConfirm: true,
                                    closeOnCancel: true
                                },
                                function (isConfirm) {
                                    if (isConfirm) {
                                        event.preventDefault();
                                        location.hash = '#' + toState.url;
                                    } else {
                                        $scope.openConfirm = true;
                                    }
                                }
                            );
                        }
                        else {
                            event.defaultPrevented = false;
                            $scope.openConfirm = true;
                        }
                    }
                });
            }
        }])
}());