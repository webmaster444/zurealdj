(function () {

    "use strict";

    angular.module('ZurealdjDjApp')
        .controller('MessagesController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce',
        'SweetAlert', 'ChatRoomsFactory', 'MessagesFactory',
        function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, SweetAlert, chat_rooms, messages) {

            $scope.messagesPage = 1;
            var syncId = null;

            $scope.q = '';

            $scope.SocketApp || ($scope.SocketApp = {});

            $scope.current_event = null;
            $scope.events = [];
            $scope.eventsPage = 1;

            $scope.retrieveEvents = function () {
                chat_rooms.all({ q: $scope.q, page: $scope.eventsPage, per_page: 1 }).success(function (data) {
                    $scope.events = $scope.events.concat(data.events);
                    $scope.eventsCount = data.count;
                }).error(function (data) {

                });
            };

            $scope.retrieveEvents();

            $scope.showMoreEvents = function(){
                if($scope.events.length < $scope.eventsCount){
                    $scope.eventsPage += 1;
                    $scope.retrieveEvents();
                }
            };


            $scope.setCurrentEvent = function(event){
                if($scope.current_event && $scope.current_event.id == event.id){
                    return
                }

                $scope.messagesCount = 0;

                if($scope.SocketApp.chat){
                    $scope.SocketApp.chat.unsubscribe();
                }

                $scope.current_event = event;
                $scope.messagesPage = 1;
                $scope.messages = [];

                $scope.retrieveOldMessages();

                $scope.SocketApp.cable = ActionCable.createConsumer();

                $scope.SocketApp.chat = $scope.SocketApp.cable.subscriptions.create({
                    channel: "ChatRoomsChannel",
                    booking_id: event.booking_id
                },{
                    connected: function(){

                    },
                    disconnected: function(){

                    },
                    received: function(data){
                        $scope.$apply(function(){
                            $scope.messages.push(data.message);
                        });
                        ion.sound.play("button_tiny");
                        scrollDown()
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

            $scope.message = "";

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


            $scope.retrieveOldMessages = function(){
                if(!$scope.messagesPenging && $scope.current_event){
                    $scope.messagesPenging = true;
                    messages.all({
                        page: $scope.messagesPage,
                        per_page: 10,
                        event_id: $scope.current_event.id,
                        sync_id: syncId
                    }).success(function(data){
                        if(!syncId && data.messages.length > 0){
                            syncId = data.messages[data.messages.length - 1].id;
                            scrollDown()
                        }
                        $scope.messages = data.messages.concat($scope.messages);
                        $scope.messagesCount = data.count;
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

            var timer = false;
            $scope.$watch('q', function(){
                if(timer){
                    $timeout.cancel(timer)
                }
                timer = $timeout(function(){
                    $scope.events = [];
                    $scope.eventsPage = 1;
                    $scope.retrieveEvents();
                }, 500)
            }, true);

        }])
}());