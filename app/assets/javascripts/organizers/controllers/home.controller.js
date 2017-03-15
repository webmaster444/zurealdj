(function () {

    "use strict";

    angular.module('ZurealdjOrganizerApp')
        .controller('HomeController', ['$scope', '$state', 'ngDialog', 'SessionsFactory', '$timeout', 'toaster',
        'UsersFactory', 'NotificationsFactory',
        function ($scope, $state, ngDialog, session, $timeout, toaster, users, notifications) {

            $scope.I18n = I18n;
            $scope.$state = $state;

            $scope.checkSession = function(){
                session.check()
                        .success(function(data){
                            $scope.current_user = data.current_user;
                        })
                        .error(function(){
                            $scope.current_user = false;
                        });
            };
            if($state.current.name != 'login'){
                $scope.checkSession();
            }

            $scope.retrieveCurrentUser = function(){
                users.profile().success(function(data){
                    $scope.$current_user = data;
                    $scope.unread_notifications_count = data.unread_notifications_count;
                    $scope.unread_messages_count = data.unread_messages_count;
                });
            };
            $scope.retrieveCurrentUser();

            $scope.$state = $state;

            $scope.logout = function(){
                session.logout().success(function(){
                    window.location = '/'
                })
            };

            $timeout(function(){
                if($scope.flash.error.length > 0){
                    toaster.pop('error', "", $scope.flash.error);
                }
                if($scope.flash.message.length > 0){
                    toaster.pop('success', "", $scope.flash.message);
                }
            }, 1000);

            $scope.changeLanguage = function(locale){
                I18n.locale = locale;
            };

            $scope.openMobileMenu = function(){
                ngDialog.open({
                    template: 'organizers/templates/common/mobile-navbar-menu.html',
                    className: 'dj-mobile-ng-dialog mobile-only',
                    scope: $scope,
                    showClose: false,
                    closeByNavigation: true
                });
            };

            $scope.openNotifications = function(){
                $scope.notifications = null;
                if($scope.notificationsDropdownOpen){
                    notifications.all({per_page: 4}).success(function(data){
                        $scope.notifications = data.notifications;
                    });


                    $scope.markAsRead = function(notification){
                        if(!notification.read){
                            notifications.markAsRead(notification.id).success(function(){
                                notification.read = true;
                                if($scope.unread_notifications_count) $scope.unread_notifications_count -= 1;
                            })
                        }
                        if(notification.link){
                            window.location = notification.link;
                            $scope.notificationsDropdownOpen = false;
                        }
                    }
                }
            };

            $scope.SocketApp || ($scope.SocketApp = {});
            $scope.unread_notifications_count = 0;
            $scope.unread_messages_count = 0;
            $scope.SocketApp.cable = ActionCable.createConsumer();
            $scope.SocketApp.watcher = $scope.SocketApp.cable.subscriptions.create({
                channel: "BadgesChannel"
            },{
                received: function(data){
                    ion.sound.play("button_tiny");
                    $scope.$apply(function(){
                        $scope.unread_notifications_count = data.message.unread_notifications_count;
                        $scope.unread_messages_count = data.message.unread_messages_count;
                    });
                }
            });

            $scope.$on("$destroy", function(){
               if($scope.SocketApp.watcher){
                   $scope.SocketApp.watcher.unsubscribe();
               }
            });
        }])
}());