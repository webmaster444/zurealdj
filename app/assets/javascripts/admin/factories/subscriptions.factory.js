(function () {
    'use strict';
    angular.module('ZurealdjAdminApp').factory('SubscriptionsFactory', ['AuthHttp', function($http){
        return {

            upsert: function(subscription){
                if(!subscription)
                    subscription = {};

                var fd = new FormData();

                fd.append('title',                          subscription.title        || '');
                fd.append('description',                    subscription.description  || '');
                fd.append('price',                          subscription.price ? Math.round(subscription.price * 100) : '');
                fd.append('period',                         subscription.period       || '');
                fd.append('period_count',                   subscription.period_count || '');

                fd.append('dj_can_be_visible_for_browsing', !!subscription.dj_can_be_visible_for_browsing);
                fd.append('dj_can_confirm_booking',         !!subscription.dj_can_confirm_booking);
                fd.append('org_can_add_dj_to_favorites',    !!subscription.org_can_add_dj_to_favorites);
                fd.append('org_can_book_dj',                !!subscription.org_can_book_dj);
                fd.append('org_can_create_event',           !!subscription.org_can_create_event);
                fd.append('subscription_for',               subscription.subscription_for || '');
                fd.append('free',                           !!subscription.free);

                if(subscription.id){
                    return $http.put('/admin/subscriptions/' + subscription.id, fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }else{
                    return $http.post('/admin/subscriptions', fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }
            },

            all: function(options){
                var url = '/admin/subscriptions.json?';
                return $http.get(url);
            },

            show: function(id){
                return $http.get('/admin/subscriptions/' + id + '.json');
            },

            destroy: function(id){
                return $http.delete('/admin/subscriptions/' + id)
            },

            updateOrder: function(subscriptions){
                return $http.post('/admin/subscriptions/update_order', {subscriptions: _.map(subscriptions, function(i){ return {id: i.id}})});
            }
        }
    }])
}());