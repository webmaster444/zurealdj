'use strict';

angular.module('ngAudio', []);

angular.module('ngAudio').directive('audio', ['$filter', '$sce', '$timeout', '$interval', 'SweetAlert', '$window', function($filter, $sce, $timeout, $interval, SweetAlert, $window) {

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

        $scope.isMobile = function(){
            return window.navigator.userAgent.match(/iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile/i)? true: false;
        };

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
            }, 500)
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
                $scope.slider.options.ceil = Math.floor($scope.audio[0].duration);
                $scope.slider.options.floor = 0;
                $scope.slider.value = $scope.audio[0].currentTime;
                if(!$scope.start)
                    $timeout(function() {
                        $('.player').addClass('play');
                        var evt = $window.document.createEvent('UIEvents');
                        evt.initUIEvent('resize', true, false, $window, 0);
                        $window.dispatchEvent(evt);
                    });
                $scope.start = true;
                $scope.audio.trigger('play');
            }
            else
            {
                $scope.audio.trigger('pause');
            }

        };

        $scope.calcDuration = function(params) {
            var time;
            if(params == 'full') time = $scope.audio[0].duration;
            else if(params == 'current') time = $scope.audio[0].currentTime;
            else if(params == 'negative') time = $scope.audio[0].duration - $scope.audio[0].currentTime;
            if(time){
                var second = Math.floor(time % 60).toString();
                return Math.floor(time / 60.0).toString() + ':' + (second.length == 1? '0' + second : second);
            }
            if(params == 'current') return '0:00';
            return null;
        };

        $scope.isPaused = function() {
            return $scope.audio[0].paused;
        };

        $scope.isPlay = function() {
            return $scope.audio[0].currentTime? true: false;
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
                            if(!$scope.model) $scope.model = {};
                            $scope.model.new = audio;
                            $scope.model.url = URL.createObjectURL(audio);
                            $scope.model.name = $scope.model.new.name;
                            $scope.edit();
                        });
                    }else{

                    }
                }
            })
        }, 0);

        $scope.delete = function() {
            SweetAlert.swal({
                    title: "Delete sample",
                    text: "Remove " + $scope.model.name + "?",
                    showCancelButton: true,
                    confirmButtonColor: "#b05dfd", confirmButtonText: "Agree",
                    cancelButtonText: "Cancel",
                    closeOnConfirm: true,
                    closeOnCancel: true
                },
                function (isConfirm) {
                    if (isConfirm) {
                        $scope.model.url = null;
                        if(!$scope.isPaused()) $scope.play();
                        if($scope.model.new) $scope.model.new = null;
                        $scope.model.removed = true;
                    } else {

                    }
                }
            );
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
        $scope.defaultDuration = true;
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
                '<div class="file-name" title="{{ model.name }}">{{ model.name }}</div>' +
                '<form ng-submit="save()" ng-show="edit_mode">' +
                    '<input type="text" class="file-name-input" ng-if="rename" ng-model="model.name" spellcheck="false">' +
                '</form>' +
                '<div class="duration" style="cursor: pointer">' +
                    '<span ng-click="defaultDuration = !defaultDuration">' +
                        '<span ng-show="start && defaultDuration">{{ calcDuration(\'current\') }} / </span>' +
                        '<span ng-show="start && !defaultDuration">' +
                            '<span ng-show="isPlay()">-</span>' +
                            '<span>{{ calcDuration(\'negative\') }} / </span>' +
                        '</span>' +
                        '<span>{{ calcDuration(\'full\') }}</span>' +
                    '</span>' +
                '</div>' +
                '<audio id="std-player" class="hide" controls=true data-ng-src="{{ trustSrc(model.url) }}" preload="metadata"></audio>' +
                '<rzslider class="time-slider" rz-slider-model="slider.value" rz-slider-options="slider.options" style="{{ start? \'display: inline-block\' : \'display: none\' }}"></rzslider>' +
                '<rzslider class="volume-slider" rz-slider-model="volume.value" rz-slider-options="volume.options" style="{{ start? \'display: inline-block\' : \'display: none\' }}"></rzslider>' +
                '<a class="btn-volume" ng-show="start" ng-click="volume.tmp_value = volume.value; volume.value = 0"></a>' +
                '<span class="silent-mode-btn white" ng-show="start && volume.value == 0.">\\</span>' +
                '<a class="silent-mode-btn color" ng-show="start && volume.value == 0." ng-click="volume.value = volume.tmp_value || 100">\\</a>' +
            '</div>' +
            '<div class="action-edit" ng-show="model.url" ng-if="rename">' +
                '<a class="edit-btn" ng-click="edit()" ng-hide="edit_mode">Rename</a>' +
                '<a class="cancel-btn" ng-click="cancel()" ng-show="edit_mode">Cancel</a>' +
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