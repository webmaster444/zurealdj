(function () {

    "use strict";

    angular.module('ZurealdjOrganizerApp')
        .controller('PricingController', ['$scope', '$state', 'SubscriptionsFactory', 'ngDialog',
            function ($scope, $state, subscriptions, ngDialog) {

                $scope.user_type = 'dj';

                $scope.retrieveSubscriptions = function(){
                    subscriptions.all().success(function (data) {
                        $scope.subscriptions = data.subscriptions;
                        Stripe.setPublishableKey(data.stripe_publishable_key);
                    });
                };
                $scope.retrieveSubscriptions();

                $scope.select = function(subscription_id){
                    $scope.selected_subscription_id = subscription_id;
                    ngDialog.closeAll();
                    ngDialog.open({
                        templateUrl: 'organizers/templates/pricing/new.html',
                        disableAnimation: true,
                        className: 'ngdialog-theme-default dj-mobile-ng-dialog',
                        controller: ['$scope', function(scope){
                            scope.requestStripeToken = function($event){
                                var form = $event.target;
                                scope.validation_errors = {};
                                scope.processing = true;

                                Stripe.card.createToken(form, function(status, data){
                                    scope.$apply(function(){
                                        if(data.error) {
                                            if(data.error.param) {
                                                scope.validation_errors[data.error.param] = data.error.message;
                                            }else{
                                                scope.validation_errors['card_number'] = data.error.message;
                                            }
                                            scope.processing = false;
                                        }else{
                                            subscriptions.get({stripe_token: data.id, subscription_id: $scope.selected_subscription_id})
                                                .success(function(){
                                                    scope.closeThisDialog();
                                                    $scope.retrieveSubscriptions();
                                                    scope.processing = false;
                                                })
                                                .error(function(){
                                                    scope.processing = false;
                                                });
                                        }
                                    });
                                })
                            };
                        }]
                    });
                };
            }]
        )
}());