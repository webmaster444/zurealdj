(function () {

    "use strict";

    angular.module('ZurealdjDjApp')
        .controller('MessagesController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce',
            'SweetAlert', 'ChatRoomsFactory',
            function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, SweetAlert, chat_rooms) {

            $scope.filters = {
                per_page: 10
            };

            $scope.current_event = null;

            $scope.retrieveEvents = function () {
                chat_rooms.all($scope.filters).success(function (data) {
                    $scope.events = data.events;
                    $scope.count = data.count;
                }).error(function (data) {

                });
            };


            $scope.retrieveEvents();

            $scope.SocketApp || ($scope.SocketApp = {});

            $scope.setCurrentEvent = function(event){
                if($scope.SocketApp.chat){
                    $scope.SocketApp.chat.unsubscribe();
                }

                $scope.current_event = event;

                $scope.SocketApp.cable = ActionCable.createConsumer();

                $scope.SocketApp.chat = $scope.SocketApp.cable.subscriptions.create({
                    channel: "ChatRoomsChannel",
                    booking_id: event.booking_id
                },{
                    connected: function(){
                        console.log('Connected.')
                    },
                    disconnected: function(){
                        console.log('Disconnected.')
                    },
                    received: function(data){
                        $scope.$apply(function(){
                            $scope.messages.push(data);
                        });
                    },
                    send_message: function(message){
                        this.perform('send_message', {
                            message: message,
                            event_id: event.id,
                            booking_id: event.booking_id,
                            to_user_id: event.dj_id
                        })
                    }
                });

                $scope.messages = [];
            };

            $scope.send = function(){
                if($scope.message.trim() != ''){
                    $scope.SocketApp.chat.send_message($scope.message)
                }
                $scope.message = '';
            };

            $scope.$on("$destroy", function(){
                if($scope.SocketApp.chat){
                    $scope.SocketApp.chat.unsubscribe();
                }
            });

        }])
}());