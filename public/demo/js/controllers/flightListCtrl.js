function flightListCtrl($scope, $q, flightServices){
    $scope.dataList = [];

    loadData();

    $scope.isCovered = function (flightId) {
        var result = false;
        for(var i = 0; i < $scope.flightCoverage.length; i++){
            if($scope.flightCoverage[i].flightId == flightId){
                result = $scope.flightCoverage[i].isCovered;
                break;
            }
        }
        return result;
    }

    function loadData(){

        $q.all([
            flightServices.getFlightCoverage(),
            flightServices.getFlightData()
        ]).then(function(result){
            $scope.flightCoverage = result[0].data;
            $scope.dataList = result[1];
        });
    }
}

angular
.module('piApp')
.controller('flightListCtrl', flightListCtrl);