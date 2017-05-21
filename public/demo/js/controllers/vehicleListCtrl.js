function vehicleListCtrl($scope, $modal, vehicleServices, $http, $q){
    $scope.dataList = [];

    loadData();

    $scope.save = function(){
        if($("#vehicleForm").valid()){
            vehicleServices.save($scope.dataList).then(function(result){
                if(result.data.status == "success"){
                    toastr.success(result.data.message);
                }
            });
        }
    }

    function loadData(){
        var promise = vehicleServices.getVehicleData();
        promise.then(function(result){
            $scope.dataList = result;
        });
    }
}

angular
.module('piApp')
.controller('vehicleListCtrl', vehicleListCtrl);