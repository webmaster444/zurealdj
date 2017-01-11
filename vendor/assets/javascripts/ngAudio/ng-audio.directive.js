'use strict';

angular.module('ngAudio', []);

angular.module('ngAudio').directive('audio', ['$filter', '$sce', '$timeout', 'SweetAlert', function($filter, $sce, $timeout, SweetAlert) {

    function link($scope, element, attributes, ctrl) {

        $scope.audio = element.find("#std-player");

        $scope.slider = {
            options: {
                floor: 0
            },
            value: 0.
        };

        var timer = false;
        $scope.$watch('slider', function(){
            if(timer){
                $timeout.cancel(timer)
            }
            timer= $timeout(function(){
                if(Math.abs($scope.audio[0].currentTime - $scope.slider.value) > 3){
                    $scope.audio[0].currentTime = $scope.slider.value;
                }
                else{
                    $scope.slider.value = $scope.audio[0].currentTime;
                }
                $scope.slider.rd = $scope.slider.value;
            }, 100)
        }, true);

        $scope.audio[0].onended = function() {
            $scope.slider.value = 0.;
            $scope.audio[0].currentTime = 0;
        };

        $scope.audio[0].ondurationchange = $scope.audio[0].onended;

        $scope.play = function() {
            if($scope.audio[0].paused) {
                $scope.slider.options.ceil = Math.ceil($scope.audio[0].duration);
                $scope.slider.options.floor = 0;
                $scope.slider.value = $scope.audio[0].currentTime;
                $scope.audio.trigger('play');
            }
            else
            {
                $scope.audio.trigger('pause');
            }

        };

        $scope.calcDuration = function(params) {
            if(params == 'full'){
                if($scope.audio[0].duration) return ($scope.audio[0].duration / 60.0).toFixed(2);
            }
            else if(params == 'current'){
                if($scope.audio[0].currentTime) return ($scope.audio[0].currentTime / 60.0).toFixed(2);
                else return 0.;
            }
            return null;
        };

        $scope.isPaused = function() {
            return $scope.audio[0].paused;
        };

        $scope.trustSrc = function(src) {
            return $sce.trustAsResourceUrl(src);
        };

        $timeout(function(){
            element.find('#sample-input').change(function(e){
                var files = e.target.files || e.dataTransfer.files;
                if(files.length > 0) {
                    var audio = files[0];
                    if(audio.type.indexOf("audio") > -1) {
                        $scope.$apply(function(){
                            $scope.model.new = audio;
                            $scope.model.url = URL.createObjectURL(audio);
                            $scope.model.name = $scope.model.new.name;
                        });
                    }else{
                        SweetAlert.swal({
                            title: "Invalid audio!",
                            type: "warning"
                        });
                    }
                }
            })
        }, 0);

        $scope.upload = attributes.upload? true: false;

    }

    return {
        link: link,
        restrict: 'A',
        require: 'ngModel',
        scope: {
            model: '=ngModel'
        },
        template: '' +
        '<div class="box-audio">' +
            '<div class="player" ng-show="model.url">' +
                '<span class="player-btn {{ isPaused()? \'btn-pause\': \'btn-play\' }}" ng-click="play()"></span>' +
                '<div class="file-name">{{ model.name }}</div>' +
                '<div class="duration" ng-show="calcDuration(\'full\')"> {{ calcDuration(\'current\') }} / {{ calcDuration(\'full\') }} </div>' +
                '<audio id="std-player" class="hide" controls=true data-ng-src="{{ trustSrc(model.url) }}" preload="metadata"></audio>' +
                '<rzslider class="time-slider" rz-slider-model="slider.value" rz-slider-options="slider.options"></rzslider>' +
            '</div>' +
            '<label class="upload" style="cursor: pointer" ng-if="upload">' +
                '<span>Upload new track</span>' +
                '<input class="hide" id="sample-input" type="file">' +
            '</label>' +
        '</div>'
    };
}]);