'use strict';

angular.module('formInput.image', ['toaster', 'ngDialog']);

angular.module('formInput.image').directive('image', ['toaster', 'ngDialog', '$filter', function(toaster, ngDialog, $filter) {

    function link(scope, element, attributes, ctrl) {

        var droppable_area = element.find('.droppable-area');
        var file_select = element.find('.file-select');

        scope.$watch('image', function(){
            if(!scope.image){
                scope.image = {removed: true};
            }
        });

        scope.removeImage = function(e){
            e.stopPropagation();
            e.preventDefault();
            scope.image.removed = true;
            scope.image.base64 = null;
            scope.image.url = null;
            return false;
        };

        var addImage = function(image){
            var base64 ='';
            if(image.type.indexOf("image") > -1) {
                var reader = new FileReader();
                reader.onload = function(e){
                    scope.$apply(function(){
                        if(attributes.cropper == 'true') {
                            scope.openCropper(image, e.target.result);
                        }
                        else{
                            scope.image = {file: image, base64: e.target.result, removed: false };
                        }
                    });
                };
                reader.readAsDataURL(image);
            }else{

            }
        };

        if (window.File && window.FileList && window.FileReader) {

            file_select[0].addEventListener("change", function(e){
                FileDragHover(e);
                var files = e.target.files || e.dataTransfer.files;
                if(files.length > 0) {
                    addImage(files[0]);
                }
                e.target.value = '';
            }, false);

            var xhr = new XMLHttpRequest();
            if (xhr.upload) {

                var FileDragHover = function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    if(e.type == 'dragover') {
                        droppable_area.addClass('file-hover')
                    }else{
                        droppable_area.removeClass('file-hover')
                    }
                };

                var FileSelectHandler = function(e) {
                    FileDragHover(e);

                    var files = e.target.files || e.dataTransfer.files;

                    if(files.length > 0) {
                        addImage(files[0]);
                    }
                };

                droppable_area[0].addEventListener("dragover", FileDragHover, false);
                droppable_area[0].addEventListener("dragleave", FileDragHover, false);
                droppable_area[0].addEventListener("drop", FileSelectHandler, false);
            }
        }

        scope.openCropper = function(image, base64){
            ngDialog.open({
                className: 'ngdialog-theme-default cropper-dialog',
                template: "cropperTemplate",
                closeByEscape: false,
                closeByNavigation: false,
                closeByDocument: false,
                controller: ['$scope', '$timeout', function ($scope, $timeout) {
                    $scope.image_data = base64;
                    $scope.cropper = null;

                    $timeout(function(){
                        var el = $('#cropper_image')[0];
                        $scope.cropper = new Cropper(el,{
                            aspectRatio: attributes.aspectratio,
                            minCropBoxHeight: 50,
                            minCropBoxWidth: 50,
                            viewMode: 0,
                            dragMode: 'move',
                            allowResize: true

                        });
                    }, 500);

                    $scope.save = function(){
                        var cropData = $scope.cropper.getData();
                        cropData.x =  Math.floor(cropData.x > 0? cropData.x: 0);
                        cropData.y =  Math.floor(cropData.y > 0? cropData.y: 0);
                        cropData.width = Math.floor(cropData.width);
                        cropData.height = Math.floor(cropData.height);
                        cropData.y = cropData.y + cropData.height <= $scope.cropper.canvasData.naturalHeight? cropData.y: $scope.cropper.canvasData.naturalHeight - cropData.height;
                        scope.image = {
                            file: image,
                            removed: false,
                            url: $scope.cropper.getCroppedCanvas().toDataURL('image/jpeg'),
                            crop_data: {
                                x: cropData.x,
                                y: cropData.y,
                                width:  cropData.width,
                                height: cropData.height,
                                rotate: cropData.rotate,
                                scaleX: cropData.scaleX,
                                scaleY: cropData.scaleY
                            }
                        };
                        $scope.closeThisDialog();
                    };
                }]
            });
        };
    }

    return {
        link: link,
        restrict: 'A',
        require: 'ngModel',
        scope: {
            image: '=ngModel'
        },
        template: "<div class='droppable-area'>" +
        "<ul class='images-list' >" +
        '<li class="plus" style="background-image: url(\'{{ image.base64 || image.url }}\')">' +
        "<label>" +
        '<i class="fa fa-plus" ng-show="image.removed"/>' +
        '<input type="file" class="file-select" />' +
        "</label>" +
        '<i class="fa fa-close" ng-click="removeImage($event)" ng-hide="image.removed"/>' +
        "</li>" +
        "<ul>" +
        "</div>"
    };
}]);

angular.module('templates').run(['$templateCache', function($templateCache) {
    $templateCache.put('cropperTemplate', "" +
        "<div class='modal-header'><h3>Prepare image:</h3></div>" +
        "<div class='modal-body' style='width: 100%; padding: 0;'><img style='width: 100%; margin: 0' id='cropper_image' ng-src='{{ image_data }}'></div>" +
        "<div class='modal-footer' style='z-index: 1000'><a class='btn btn-success btn-cropper' ng-click='save()'>Ok</a></div>" +
        "");
}]);