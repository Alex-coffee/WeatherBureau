function nodeListCtrl($scope, $modal, routingServices, $http, $q){
    loadData();

    $scope.saveRouters = function(){

        var saveObj = angular.copy($scope.routerList);
        prepareORData($scope.routerList);

        for(var i = 0; i < saveObj.length; i++){
            saveObj[i].fromPoint = undefined;
            saveObj[i].toPoint = undefined;

            if(!saveObj[i].arrOnly){
                saveObj[i].arrOnly = false;
            }

            if(!saveObj[i].depOnly){
                saveObj[i].depOnly = false;
            }
        }

        routingServices.saveJSON("routers.json", saveObj).then(function(result){
            if(result.data.status == "success"){
                toastr.success(result.data.message);
            }
        });
    }

    $scope.getCoordIndex = function(point){
        var index;
        if($scope.coordinateList){
            for(var i = 0; i < $scope.coordinateList.length; i++){
                if($scope.coordinateList[i].x == point.x && $scope.coordinateList[i].y == point.y){
                    index = i;
                    break;
                }
            }
        }
        return index;
    }

    function prepareORData(routerSource){
        var routerList = angular.copy(routerSource);

        for(var i = 0; i < routerList.length; i++){
            routerList[i].from = routerList[i].fromPoint;
            routerList[i].to = routerList[i].toPoint;
            routerList[i].fromPoint = undefined;
            routerList[i].toPoint = undefined;
        }

        routingServices.saveJSON("link.json", routerList);
        routingServices.generateORFile("link.json", routerList);


        var coordIndexList = [];
        for(var i = 0; i < $scope.coordinateList.length; i++){
            coordIndexList.push({
                index: i,
                x: $scope.coordinateList[i].x,
                y: $scope.coordinateList[i].y
            })
        }
        routingServices.saveJSON("indexMapping.json", coordIndexList);
        routingServices.generateORFile("airportNode.json", coordIndexList);

    }

    function loadData(){
        $q.all([
            routingServices.getCoordinateData(),
            routingServices.getRouterData()
        ]).then(function(result){
            $scope.coordinateList = result[0].data;
            $scope.routerList = result[1].data;

            for(var i = 0; i < $scope.routerList.length; i++){
                var point = $scope.routerList[i];
                point.fromPoint = $scope.getCoordIndex(point.from);
                point.toPoint = $scope.getCoordIndex(point.to);
            }

        })
    }
}

angular
.module('piApp')
.controller('nodeListCtrl', nodeListCtrl);