(function () {

    "use strict";

    angular.module('ZurealdjLandingApp')
        .controller('PricingController', ['$scope', '$state', 'SubscriptionsFactory',
            function ($scope, $state, subscriptions) {

                $scope.user_type = 'dj';

                subscriptions.all().success(function (data) {
                    $scope.subscriptions = data.subscriptions;
                });

            }]
        )
}());