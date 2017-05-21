//demands
function gateCoordinateServices($http, $q){


    var getGateCoordinate = function(){
        var deferred = $q.defer();
        $http.get("demo/data/gateCoordinate.json")
            .success(function(data){
                deferred.resolve(data);
            })
        return deferred.promise;
    }

    return{
        getGateCoordinate: getGateCoordinate,
    }
}

angular
.module('piApp')
.factory('gateCoordinateServices', gateCoordinateServices);

