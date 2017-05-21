function kpiServices($http, $q){

    var getKPIData = function(){
        return $http.get("/demo/or/KPIs.json")
    }

    return{
        getKPIData: getKPIData
    }
}

angular
.module('piApp')
.factory('kpiServices', kpiServices);

