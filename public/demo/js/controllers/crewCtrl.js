function crewCtrl($scope, $http, $q){

    $scope.chartData = {
        labels: ['410', '420', '430', '440'],
        series: [
            [{meta: '地勤', value: 30}, {meta: '地勤', value: 40}, {meta: '地勤', value: 45}, {meta: '地勤', value: 35}],
            [{meta: '空乘', value: 10}, {meta: '空乘', value: 15}, {meta: '空乘', value: 15}, {meta: '空乘', value: 10}],
            [{meta: '管控', value: 5}, {meta: '管控', value: 7}, {meta: '管控', value: 6}, {meta: '管控', value: 5}],
        ]
    }

    $scope.chartOptions = {
        stackBars: true,
        plugins: [
            Chartist.plugins.tooltip({
                pointClass: 'my-cool-point'
            })
        ]
    }

    $scope.chartEvent = {
        draw : function(data) {
            if(data.type === 'bar') {
                data.element.attr({
                    style: 'stroke-width: 50px'
                });
            }
        }
    }

}

angular
.module('piApp')
.controller('crewCtrl', crewCtrl);