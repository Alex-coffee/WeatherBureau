function solutionServices($http, $q){

    // var getSolutionList = function(){
    //     return $http.get("demo/or/Solutions.json");
    // }

    var getSolutionList = function(){
        return $http.get("/api/solutions/get");
    }

    var runOR = function(orParams){
        return $http.post("/api/runOR", orParams);
    }
    var runBatchOR = function(){
        return $http.post("/api/batch/runOR");
    }
    var clearSolutions = function(){
        return $http.post("/api/solutions/reset");
    }

    return{
        getSolutionList: getSolutionList,
        runOR: runOR,
        runBatchOR: runBatchOR,
        clearSolutions: clearSolutions
    }
}

angular
.module('piApp')
.factory('solutionServices', solutionServices);

