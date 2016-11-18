(function () {

    "use strict";

    angular.module('ZurealdjApp')
        .controller('EquipmentsController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce', 'SweetAlert', 'EquipmentsFactory', 'CountryFlagsFactory',
            function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, SweetAlert, equipments, flags) {
                $scope.I18n = I18n;
                $scope._ = _;
                $scope.$state = $state;

                $scope.getHtml = function(html){
                    return $sce.trustAsHtml(html);
                };


                $scope.filters = {};

                if($state.current.name == 'equipments'){
                    $scope.equipment = [];

                    var timer = false;
                    $scope.$watch('filters', function(){
                        if(timer){
                            $timeout.cancel(timer)
                        }
                        timer= $timeout(function(){
                            $scope.retrieveEquipments();
                        }, 500)
                    }, true);

                    $scope.page = 1;
                    $scope.retrieveEquipments = function(){
                        equipments.all({page: $scope.page, query: $scope.filters}).success(function (data) {
                            $scope.equipments = data.equipments;
                            $scope.count = data.count;

                            var pagination = $('#equipments-pagination');
                            pagination.empty();
                            pagination.removeData('twbs-pagination');
                            pagination.unbind('page');

                            if($scope.count > 0){
                                pagination.twbsPagination({
                                    totalPages: Math.ceil($scope.count / 9),
                                    startPage: $scope.page,
                                    visiblePages: 9,
                                    onPageClick: function (event, page) {
                                        $scope.page = page;
                                        $scope.retrieveEquipments();
                                    }
                                })
                            }
                        }).error(function (data) {

                        });
                    };

                    $scope.retrieveEquipments();
                }

                $scope.destroy = function(id){
                    var scope = $scope;
                    SweetAlert.swal({
                            title: "Are you sure?",
                            text: "Your will not be able to recover this equipments!",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
                            cancelButtonText: "No, cancel plx!",
                            closeOnConfirm: true,
                            closeOnCancel: true,
                            allowOutsideClick: true },
                        function(isConfirm){
                            if (isConfirm) {
                                equipments.destroy(id).success(function(){
                                    $scope.retrieveEquipments();
                                });
                            } else {

                            }
                        }
                    );
                };

                if($state.current.name == 'new_equipment' || $state.current.name == 'edit_equipment'){

                    $scope.equipment = {};


                    if($state.current.name == 'edit_equipment'){
                        equipments.show($stateParams.id)
                            .success(function(data){
                                $timeout(function(){
                                    $scope.equipment = data.equipment;
                                }, 0);
                            }
                        )
                    }

                    $scope.submitEquipment = function(){
                        $scope.submitted = true;
                        if($scope.EquipmentForm.$invalid ){
                            return false;
                        }

                        $scope.formPending = true;
                        equipments.upsert($scope.equipment)
                            .success(function(){
                                $scope.formPending = false;
                                $state.go('equipments')
                            })
                            .error(function(data){
                                $scope.validation_errors = data.errors;
                                $scope.formPending = false;
                            })
                    };
                }

                if($state.current.name == 'show_equipment'){
                    equipments.show($stateParams.id).success(function(data){
                        $scope.equipment = data.equipment;

                    });
                }
            }])

}());