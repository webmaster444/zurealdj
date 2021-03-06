(function () {

    "use strict";

    angular.module('ZurealdjAdminApp')
        .controller('DjsController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce', 'SweetAlert', 'DjsFactory', 'CountryFlagsFactory',
            function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, SweetAlert, djs, flags) {
                $scope.I18n = I18n;
                $scope._ = _;
                $scope.$state = $state;

                $scope.getHtml = function(html){
                    return $sce.trustAsHtml(html);
                };

                flags.all().success(function(data){
                    $scope.flags = data.flags;
                });

                if($state.current.name == 'djs'){

                    $scope.resetFilters = function(){
                        $scope.filters = {
                            per_page: 10,
                            page: 1
                        };
                    };

                    $scope.resetFilters();

                    var timer = false;
                    $scope.$watch('filters', function(){
                        if(timer){
                            $scope.page = 1;
                            $timeout.cancel(timer)
                        }
                        timer= $timeout(function(){
                            if($scope.filters.page > Math.ceil($scope.total / $scope.filters.per_page)) $scope.filters.page = 1;
                            $scope.retrieveDjs();
                        }, 500)
                    }, true);

                    $scope.retrieveDjs = function(){
                        djs.all($scope.filters).success(function (data) {
                            $scope.djs = data.djs;
                            $scope.total = data.count;
                        });
                    };

                    $scope.retrieveDjs();

                    $scope.downloadCSV = function(){
                        djs.downloadCSV({query: $scope.filters})
                    }
                }

                $scope.destroy = function(id){
                    var scope = $scope;
                    SweetAlert.swal({
                            title: "Are you sure?",
                            text: "Your will not be able to recover this DJ!",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
                            cancelButtonText: "No, cancel plx!",
                            closeOnConfirm: true,
                            closeOnCancel: true,
                            allowOutsideClick: true },
                        function(isConfirm){
                            if (isConfirm) {
                                djs.destroy(id).success(function(){
                                    $scope.retrieveDjs();
                                });
                            } else {

                            }
                        }
                    );
                };

                if($state.current.name == 'edit_dj'){

                    $scope.dj = {};


                    if($state.current.name == 'edit_dj'){
                        djs.show($stateParams.id)
                            .success(function(data){

                                    $scope.dj = data.dj;

                            }
                        )
                    }

                    $scope.submitDj = function(){
                        $scope.submitted = true;
                        $scope.formPending = true;
                        djs.upsert($scope.dj)
                            .success(function(){
                                $scope.formPending = false;
                                $state.go('djs')
                            })
                            .error(function(data){
                                $scope.validation_errors = data.errors;
                                $scope.formPending = false;
                            })
                    };
                }

                if($state.current.name == 'show_dj'){
                    djs.show($stateParams.id).success(function(data){
                        $scope.dj = data.dj;

                    });
                }

                $scope.trustSrc = function(src) {
                    return $sce.trustAsResourceUrl(src);
                };

                $timeout(function(){
                    $('#sample-input').change(function(e){
                        var files = e.target.files || e.dataTransfer.files;
                        if(files.length > 0) {
                            var audio = files[0];
                            if(audio.type.indexOf("audio") > -1) {
                                $scope.$apply(function(){
                                    $scope.dj.sample = audio;
                                    $scope.dj.sample_url = URL.createObjectURL(audio);
                                });
                            }else{

                            }
                        }
                    })
                }, 0);
            }])
}());