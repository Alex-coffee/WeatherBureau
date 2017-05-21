function vehicleServices($http, $q){

    var getVehicleData = function(){
        return $http.get("demo/data/VehicleInputJson.json")
    }

    var save = function(vehicleList){
        return $http.post("/api/saveVehicle/", vehicleList)
    }

    return{
        getVehicleData: getVehicleData,
        save: save
    }
}

angular
.module('piApp')
.factory('vehicleServices', vehicleServices);

