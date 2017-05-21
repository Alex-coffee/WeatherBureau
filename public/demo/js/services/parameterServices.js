function parameterServices($http, $location, $q){
    var getParameterData = function(){
        return $http.get("demo/or/Parameters.json");
    }

    function saveJSON(fileName, list){
        return $http.post("/api/saveJSON", {fileName: fileName, content: list});
    }

    function saveParameter(parameter){
        return $http.post("/api/saveParameter/", parameter);
    }

    return{
        getParameterData: getParameterData,
        saveParameter: saveParameter,
    }
}

angular
.module('piApp')
.factory('parameterServices', parameterServices);

