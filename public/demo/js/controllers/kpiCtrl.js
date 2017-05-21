function kpiCtrl($scope, kpiServices){
    $scope.dataList = [];

    loadData();

    function loadData(){
        kpiServices.getKPIData().then(function(result){
            $scope.kpi = result.data;
        });


    }
}

angular
.module('piApp')
.controller('kpiCtrl', kpiCtrl);