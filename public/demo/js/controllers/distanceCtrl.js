function distanceCtrl($scope, distanceServices){
    $scope.dataList = [];

    loadData();

    function loadData(){
        distanceServices.getData().then(function(result){
            $scope.dataList = result.data;
        });
    }
}

angular
.module('piApp')
.controller('distanceCtrl', distanceCtrl);