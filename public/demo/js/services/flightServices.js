function flightServices($http, $q){

    var getFlightData = function(){
        var deferred = $q.defer();
        $http.get("demo/or/Flights.json")
            .success(function(data){
                deferred.resolve(data);
            })
        return deferred.promise;
    }

    var save = function(flightList){
        return $http.post("/api/saveFlight/", flightList)
    }

    var getFlightCoverage = function () {
        return $http.get("demo/or/flightCoverStatus.json")
    }

    return{
        getFlightData: getFlightData,
        getFlightCoverage: getFlightCoverage,
        save: save
    }
}

angular
.module('piApp')
.factory('flightServices', flightServices);

