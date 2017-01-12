'use strict';

angular.module('ngAudio', []);

angular.module('ngAudio').directive('audio', ['$filter', '$sce', '$timeout', '$interval', 'SweetAlert', function($filter, $sce, $timeout, $interval, SweetAlert) {

    function link($scope, element, attributes, ctrl) {

        $scope.audio = element.find("#std-player");

        $scope.slider = {
            options: {
                floor: 0
            },
            value: 0.
        };

        $scope.volume = {
            options: {
                floor: 0,
                ceil: 100
            },
            value: 100
        };

        $scope.start = false;

        var timerTimeSlider = false;
        $scope.$watch('slider', function(){
            if(Math.abs($scope.audio[0].currentTime - $scope.slider.value) > 2) {
                $scope.audio[0].currentTime = $scope.slider.value;
            }
            if(timerTimeSlider){
                $timeout.cancel(timerTimeSlider)
            }
            timerTimeSlider = $timeout(function(){
                return true;
            }, 100)
        }, true);

        var timerVolumeSlider = false;
        $scope.$watch('volume', function(){
            if(timerVolumeSlider){
                $timeout.cancel(timerVolumeSlider)
            }
            timerVolumeSlider = $timeout(function(){
                $scope.audio[0].volume = $scope.volume.value / 100.;
            }, 100)
        }, true);

        $interval(function(){
            $scope.slider.value = $scope.audio[0].currentTime;
        }, 500);

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
                $scope.start = true;
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
                            $scope.edit();
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

        $scope.delete = function() {
            $scope.model.url = null;
            if(!$scope.isPaused()) $scope.play();
            if($scope.model.new) $scope.model.new = null;
        };

        $scope.edit = function() {
            $scope.buffer = $scope.model.name;
            $scope.edit_mode = true;
            $timeout(function() {
                $( ".file-name-input" ).trigger("focus");
            }, 100);
        };

        $scope.cancel = function () {
            $scope.model.name = $scope.buffer;
            $scope.edit_mode = false;
        };

        $scope.save = function() {
            if(!$scope.model.name) $scope.model.name = $scope.buffer;
            $scope.edit_mode = false;
        };

        $scope.upload = attributes.upload? true: false;
        $scope.rename = attributes.rename? true: false;
        $scope.edit_mode = false;

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
                '<form ng-submit="save()" ng-show="edit_mode">' +
                    '<input type="text" class="file-name-input" ng-if="rename" ng-model="model.name" spellcheck="false">' +
                '</form>' +
                '<div class="duration" ng-show="calcDuration(\'full\')"> {{ calcDuration(\'current\') }} / {{ calcDuration(\'full\') }} </div>' +
                '<audio id="std-player" class="hide" controls=true data-ng-src="{{ trustSrc(model.url) }}" preload="metadata"></audio>' +
                '<rzslider class="time-slider" rz-slider-model="slider.value" rz-slider-options="slider.options" style="{{ start? \'display: inline-block\' : \'display: none\' }}"></rzslider>' +
                '<rzslider class="volume-slider" rz-slider-model="volume.value" rz-slider-options="volume.options" style="{{ start? \'display: inline-block\' : \'display: none\' }}"></rzslider>' +
                '<i class="btn-volume" ng-show="start"></i>' +
            '</div>' +
            '<div class="action-edit" ng-show="model.url" ng-if="rename">' +
                '<a class="edit-btn" ng-click="edit()" ng-hide="edit_mode">Edit</a>' +
                '<a class="save-btn" ng-click="cancel()" ng-show="edit_mode">Cancel</a>' +
                '<a class="save-btn" ng-click="save()" ng-show="edit_mode">Save</a>' +
            '</div>' +
            '<a class="delete-btn" ng-show="model.url" ng-if="upload" ng-click="delete()">Delete</a>' +
            '<label class="upload" style="cursor: pointer" ng-if="upload">' +
                '<span ng-hide="model.url">Upload new track</span>' +
                '<input class="hide" id="sample-input" type="file">' +
            '</label>' +
        '</div>'
    };
}]);