function distanceServices($http){
    var getData = function(){
        return $http.get("demo/or/Distances.json");
    }

    return{
        getData: getData,
    }
}

angular
.module('piApp')
.factory('distanceServices', distanceServices);

