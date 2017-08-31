'use strict';

angular.module('formInput.country', []);

angular.module('formInput.country').directive('country', ['$filter', 'CountryFlagsFactory', function($filter, countries) {

    function link($scope, element, attributes, ctrl) {
        $scope.id = attributes.ngModel;

        countries.all().success(function(data){
            $scope.countries = data.flags;

            $scope.$watch('model', function(){
                $scope.current_country = _.find($scope.countries, function(c){ return $scope.model == c.code });
            });
        });

        $scope.updateCountry = function(country){
            $scope.current_country = country;
            $scope.model = $scope.current_country.code;
        };
    }

    return {
        link: link,
        restrict: 'A',
        require: 'ngModel',
        scope: {
            model: '=ngModel'
        },
        template: '' +
        '<div class="btn-group" uib-dropdown style="width: 100%">' +
        '  <a class="btn btn-default" id="{{ id }}" uib-dropdown-toggle style="width: 100%; text-align: left; position: relative">' +
        '    <span ng-hide="current_country">Please choose a country</span>' +
        '    <span>' +
        '      <span ng-show="current_country" class="flag {{ current_country.code }}"></span>' +
        '      {{ current_country.title }}' +
        '    </span>' +
        '    <span class="caret" style="position: absolute; right: 9px; top: 13px"></span>' +
        '  </a>' +
        '  <ul class="dropdown-menu" aria-labelledby="{{ id }}" role="menu" uib-dropdown-menu>' +
        '    <li ng-repeat="country in countries">' +
        '      <a ng-click="updateCountry(country)">' +
        '        <span class="flag {{ country.code }}"></span>' +
        '        {{ country.title }}' +
        '      </a>' +
        '    </li>' +
        '  </ul>' +
        '</div>'
    };
}]);