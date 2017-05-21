//demands
function ganttServices($http, $q){

    var getGateData = function(){
        return $http.get(rootPath + "/api/gate/list");
    }

    var getPuckData = function(){
        return $http.get(rootPath + "/api/integration/caacsri/result");
    }

    return{
        getGateData: getGateData,
        getPuckData: getPuckData
    }
}

angular
.module('piApp')
.factory('ganttServices', ganttServices);

