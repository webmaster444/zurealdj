(function () {

    "use strict";

    angular.module('ZurealdjDjApp')
        .controller('UsersController', ['$scope', '$state', 'ngDialog', '$stateParams', 'UsersFactory',
            'CountryFlagsFactory', 'SweetAlert',
        function ($scope, $state, ngDialog, $stateParams, users, countries, SweetAlert) {
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



            users.profile().success(function(data){
                $scope.user = data;
                userOriginalData = _.clone($scope.user);
            });

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


            $scope.comment_options = {
                page: 1,
                per_page: 10
            };

            $scope.comments = [];

            $scope.retrieveComments = function() {
                users.comments($scope.comment_options).success(function(data){
                    $scope.comments = $scope.comments.concat(data.comments);
                    $scope.comments_count = data.count;
                });
            };

            $scope.retrieveComments();

            $scope.showMore = function() {
                if($scope.comments_count > $scope.comments.length){
                    $scope.comment_options.page += 1;
                    $scope.retrieveComments();
                }
            };

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
                        $scope.validation_errors = data.validation_errors;
                        if($scope.validation_errors && ($scope.validation_errors["dj.sample"] || $scope.validation_errors && $scope.validation_errors["dj.sample_content_type"])){
                            SweetAlert.swal({
                                title: "",
                                text: "You can upload audio with mp3 format only.",
                                confirmButtonColor: "#b05dfd",
                                confirmButtonText: "Ok",
                                closeOnConfirm: true,
                                customClass: "confirm-only"
                            });
                        }
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