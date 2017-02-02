(function () {

    "use strict";

    angular.module('ZurealdjOrganizerApp')
        .controller('MessagesController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce',
        'SweetAlert', 'ChatRoomsFactory', 'MessagesFactory',
        function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, SweetAlert, chat_rooms, messages) {

            $scope.messagesPage = 1;
            var syncId = null;

            $scope.filters = {
                per_page: 10
            };

            $scope.current_event = null;
            $scope.SocketApp || ($scope.SocketApp = {});

            $scope.retrieveChatRooms = function () {
                chat_rooms.all($scope.filters).success(function (data) {
                    $scope.events = data.events;
                    $scope.count = data.count;
                }).error(function (data) {

                });
            };

            $scope.retrieveChatRooms();

            $scope.setCurrentEvent = function(event, dj){
                if($scope.current_event && $scope.current_event.id == event.id){
                    return
                }

                if($scope.SocketApp.chat){
                    $scope.SocketApp.chat.unsubscribe();
                }
                $scope.current_event = event;
                $scope.current_dj = dj;
                $scope.messagesPage = 1;
                $scope.messages = [];

                $scope.retrieveOldMessages();

                $scope.SocketApp.cable = ActionCable.createConsumer();

                $scope.SocketApp.chat = $scope.SocketApp.cable.subscriptions.create({
                    channel: "ChatRoomsChannel",
                    booking_id: dj.booking_id
                },{
                    connected: function(){

                    },
                    disconnected: function(){

                    },
                    received: function(data){
                        $scope.$apply(function(){
                            $scope.messages.push(data.message);
                        });
                        scrollDown()
                    },
                    send_message: function(message){
                        this.perform('send_message', {
                            message: message,
                            event_id: event.id,
                            booking_id: dj.booking_id,
                            to_user_id: dj.id
                        })
                    }
                });

                $scope.messages = [];
            };

            $scope.send = function(){
                if($scope.message.trim() != ''){
                    $scope.SocketApp.chat.send_message($scope.message);
                }
                $scope.message = ''
            };

            $scope.$on("$destroy", function(){
                if($scope.SocketApp.chat){
                    $scope.SocketApp.chat.unsubscribe();
                }
            });

            $scope.retrieveOldMessages = function(){
                if(!$scope.messagesPenging && $scope.current_event && $scope.current_dj){
                    $scope.messagesPenging = true;
                    messages.all({
                        page: $scope.messagesPage,
                        dj_id: $scope.current_dj.id,
                        event_id: $scope.current_event.id,
                        sync_id: syncId
                    }).success(function(data){
                        if(!syncId && data.messages.length > 0){
                            syncId = data.messages[data.messages.length - 1].id;
                            ion.sound.play("button_tiny");
                            scrollDown()
                        }
                        $scope.messages = data.messages.concat($scope.messages);
                        $scope.messagesPage += 1;
                        $scope.messagesPenging = false;
                    }).error(function(){
                        $scope.messagesPenging = false;
                    })
                }
            };

            var scrollDown = function(){
                $timeout(function(){
                    var bottomCoord = $('.chat-discussion')[0].scrollHeight;
                    $('.chat-discussion').slimScroll({scrollTo: bottomCoord});
                }, 300)
            };
        }])
}());