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

            users.profile().success(function(data){
                $scope.user = data;
                $scope.$parent.$current_user = $scope.user;
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
                        $state.go('profile');
                        $scope.processing = false;
                    })
                    .error(function(data){
                        $scope.processing = false;
                        $scope.validation_errors = data.validation_errors;
                        if($scope.validation_errors && ($scope.validation_errors["dj.sample"] || $scope.validation_errors$scope.validation_errors["dj.sample_content_type"])){
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
        }])
}());