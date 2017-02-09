'use strict';

angular.module('formInput.timepicker', []);

angular.module('formInput.timepicker').directive('timepicker', ['$filter', function($filter) {

    function link(scope, element, attributes, ctrl) {

        scope.times = [];
        var meridiem = ['AM', 'PM'];

        for(var a in meridiem){
            for(var h = 0; h <= 12; h++){
                for(var m = 0; m < 60; m = m + 15){
                    if(h == 0 && m == 0) {

                    }else if(h == 12 && m > 0 && meridiem[a] == 'PM'){

                    }else if(h == 0 && meridiem[a] == 'PM'){

                    }else{
                        scope.times.push({
                            lable: String("0" + h).slice(-2) + ':' + String("0" + m).slice(-2) + ' ' + meridiem[a]
                        });
                    }
                }
            }
        }

        scope.times.pop();

        scope.setModel = function(value){
            scope.model = value.lable
        }
    }

    return {
        link: link,
        restrict: 'A',
        require: 'ngModel',
        scope: {
            model: '=ngModel',
            placeholder: '=placeholder'
        },
        template: '' +
        '<span class="dj-dropdown" uib-dropdown>' +
        '  <i class="fa fa-chevron-down"/>' +
        '  <a uib-dropdown-toggle>' +
        '    <span ng-hide="model">{{ placeholder }}</span>' +
        '    <span ng-show="model">{{ model }}</span>' +
        '  </a>' +
        '  <ul class="dropdown-menu" role="menu" uib-dropdown-menu>' +
        '    <li ng-repeat="t in times" ng-click="setModel(t)">' +
        '      <a>' +
        '        {{ t.lable }}' +
        '      </a>' +
        '    </li>' +
        '  </ul>' +
        '</span>'
    };
}]);
