function staffServices($http){
    var getData = function(){
        return $http.get("demo/or/Staffs.json");
    }

    return{
        getData: getData,
    }
}

angular
.module('piApp')
.factory('staffServices', staffServices);

