function staffCtrl($scope, staffServices){
    $scope.dataList = [];

    loadData();

    function loadData(){
        staffServices.getData().then(function(result){
            $scope.dataList = result.data;
        });
    }
}

angular
.module('piApp')
.controller('staffCtrl', staffCtrl);