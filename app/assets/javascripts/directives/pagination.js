'use strict';

angular.module('pagination', []);

angular.module('pagination').directive('pagination', [function() {

    function link(scope, element, attributes, ctrl) {

        scope.$watch('total', function(){
            scope.update();
        });

        scope.$watch('page', function(){
            scope.update();
        });

        scope.$watch('per_page', function(){
            scope.update();
        });

        scope.update = function(){
            var pagination = $(element);
            pagination.empty();
            pagination.removeData('twbs-pagination');
            pagination.unbind('page');

            if(scope.total > 0){
                pagination.twbsPagination({
                    totalPages: Math.ceil(scope.total / scope.per_page),
                    startPage: scope.page,
                    visiblePages: 9,
                    onPageClick: function (event, page) {
                        scope.$apply(function(){
                            scope.page = page;
                        })
                    }
                })
            }
        };
    }

    return {
        link: link,
        restrict: 'A',
        scope: {
            page: '=page',
            per_page: '=perPage',
            total: '=total'
        }
    };
}]);
