(function () {

    "use strict";

    angular.module('ZurealdjDjApp')
        .controller('UsersController', ['$scope', '$state', 'ngDialog', '$stateParams', 'UsersFactory',
            'CountryFlagsFactory', '$timeout', '$sce',
        function ($scope, $state, ngDialog, $stateParams, users, countries, $timeout, $sce) {
            $scope.I18n = I18n;
            $scope._ = _;
            $scope.$state = $state;
            $scope.$parent.no_second_navbar = false;

            $scope.user = {};

            users.profile().success(function(data){
                $scope.user = data;
            });

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
                    })
            };

            $scope.trustSrc = function(src) {
                return $sce.trustAsResourceUrl(src);
            };

            $timeout(function(){
                $('#sample-input').change(function(e){
                    var files = e.target.files || e.dataTransfer.files;
                    console.log(e);
                    if(files.length > 0) {
                        var audio = files[0];
                        if(audio.type.indexOf("audio") > -1) {
                            $scope.$apply(function(){
                                $scope.user.sample = audio;
                                $scope.user.sample_url = URL.createObjectURL(audio);
                            });
                        }else{

                        }
                    }
                })
            }, 0);
        }])
}());