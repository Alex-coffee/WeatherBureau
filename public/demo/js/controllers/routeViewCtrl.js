function routeViewCtrl($scope, $http, $timeout, routingServices, $q, $filter) {
    $scope.planeInteractionArray = [];
    $scope.ganttRefreash = 0;
    loadPage();

    function loadPage(){

        routingServices.getParameterData().then(function(result){
            $scope.parametersData = result.data;
        });


        routingServices.getAllData().then(function(result){
            if(result.data == null){
                toastr.warning("暂无可行解，请检查参数并重新优化路线");
                $("#ganttChartContainer").html("");
                return;
            }
            $scope.routeList = result.data;
            $scope.routeDetailList = generateDetailRouteList($scope.routeList);
            $scope.routePoints = routingServices.generateRoutePoints($scope.routeList);

            $timeout(function(){
                routingServices.showCoordinate();

                generateGantt();
                $scope.ganttRefreash += 1;

                routingServices.getRouterData().then(function(result){
                    var unlinkNodes = [];
                    var depOnlyNodes = [];
                    var arrOnlyNodes = [];
                    for(var i = 0; i < result.data.length; i ++){
                        if(result.data[i].isActived == false){
                            unlinkNodes.push(result.data[i]);
                        }

                        if(result.data[i].arrOnly == true){
                            arrOnlyNodes.push(result.data[i]);
                        }

                        if(result.data[i].depOnly == true){
                            depOnlyNodes.push(result.data[i]);
                        }
                    }
                    routingServices.generateUnlinkedNode(unlinkNodes);
                    routingServices.markArrOnly(arrOnlyNodes);
                    routingServices.markDepOnly(depOnlyNodes);
                });

            }, 500);
        });
    }

    $scope.playRoute = function(){
        routingServices.getAllData().then(function(result){
            $scope.routeList = result.data;
            $scope.routePoints = routingServices.generateRoutePoints($scope.routeList);
            routingServices.playRoute($scope.routePoints, $scope);
        });
    }

    $scope.generateNode = function(){
        if(confirm("这个动作会覆盖现有的节点配置, 确定生成节点吗?")){
            routingServices.generateNode().then(function(result){
                if(result.isSuccess){
                    toastr.success(result.message);
                }
            });
        }
    }

    $scope.fixNode = function(){
        $q.all([
            $http.get("demo/data/output/json/link.json"),
            $http.get("demo/data/output/json/back/indexMapping.json"),
            $http.get("demo/data/output/json/back/link.json"),
            $http.get("demo/data/output/json/routers.json"),
            $http.get("demo/data/output/json/back/routers.json"),
        ]).then(function(result){
            var oldNodes = result[0].data;
            var nodesMapping = result[1].data;
            var newNodes = result[2].data;

            var routeNodes = result[3].data;
            var backupRouteNodes = result[4].data;


            var nodesToReplace = [];
            var routersToRelpace = [];
            for(var i = 0; i < newNodes.length; i++){
                var node = newNodes[i];
                var router = backupRouteNodes[i];
                if(node.arrOnly || node.depOnly){
                    nodesToReplace.push(node);
                    routersToRelpace.push(router);
                }
            }

            for(var i = 0; i < nodesToReplace.length; i++){
                var currentNode = nodesToReplace[i];
                var currentRoute = routersToRelpace[i];

                replaceLinkObj(oldNodes, currentNode);
                replaceRouteObj(routeNodes, currentRoute);
            }

            $q.all([
                routingServices.saveJSON("link.json", oldNodes),
                routingServices.saveJSON("routers.json", routeNodes)
            ]).then(function(result){

                toastr.success("Saved");

            });

            // routingServices.saveJSON("link.json", oldNodes).then(function(result){
            //     if(result.data.status == "success"){
            //         toastr.success(result.data.message);
            //     }
            // });
            //
            // routingServices.saveJSON("routers.json", routeNodes).then(function(result){
            //     if(result.data.status == "success"){
            //         toastr.success(result.data.message);
            //     }
            // });
        })

    }

    function getNodeCoord(index, source){
        var result;
        for(var i = 0; i < source.length; i++){
            if(index == source[i].index){
                result = source[i];
                break;
            }
        }
        return result;
    }

    function getNodeIndex(coord, source){
        var result;
        for(var i = 0; i < source.length; i++){
            if(coord == source[i]){
                result = source[i].index;
                break;
            }
        }
        return result;
    }

    var replaceLinkObj = function (targetArray, obj) {
        var findInOld = false;
        for(var i = 0; i < targetArray.length; i++){
            var currentObj = targetArray[i];
            if(currentObj.from == obj.from && currentObj.to == obj.to){
                targetArray[i] = obj;
                findInOld = true;
                break;
            }
        }
        if(!findInOld){
            targetArray.push(obj);
        }
    }

    var replaceRouteObj = function (targetArray, obj) {
        var findInOld = false;
        for(var i = 0; i < targetArray.length; i++){
            var currentObj = targetArray[i];
            if(currentObj.from.x == obj.from.x && currentObj.to.x == obj.to.x &&
                currentObj.from.y == obj.from.y && currentObj.to.y == obj.to.y){
                targetArray[i] = obj;
                findInOld = true;
                break;
            }
        }
        if(!findInOld){
            targetArray.push(obj);
        }
    }

    $scope.checkInteraction = function(){
        console.log($scope.planeInteractionArray);
    }

    $scope.optRout = function() {
        // start loading
        $scope.isLoading = true;

        $http.get("/api/runOR/").then(function(result){
            if(result.data.isFinished == true){
                $scope.isLoading = false;
                $scope.ganttRefreash += 1;
                loadPage();
             }
        })
    };

    function generateDetailRouteList(routeList){
        var result = [];
        $scope.slotList = [];

        for(var i = 0; i < routeList.length; i++){

            var route = routeList[i];
            var routeSize = route.Route.length;

            $scope.slotList.push({
                slot: route.Flight,
                distance: route.RouteLength
            });

            //var routeLength = route.RouteLength;
            var flight = route.Flight;
            var type = route.Type;

            for(var j = 1; j < routeSize; j++){
                var detailRoute = {};
                var point = route.Route[j];

                var delay = 0;
                var duration = 0;
                if(j < routeSize){
                    delay = route.DepTime[j - 1] - route.ArrTime[j - 1];
                    duration = route.ArrTime[j] - route.DepTime[j - 1];
                }

                detailRoute['flight'] = flight;
                detailRoute['point'] = point;
                detailRoute['label'] = route.Route[j - 1] + " - " + route.Route[j];
                detailRoute['startTime'] = route.ArrTime[j - 1];
                detailRoute['endTime'] = route.ArrTime[j];
                detailRoute['delay'] = delay;
                detailRoute['duration'] = duration;
                detailRoute['type'] = type;

                if(delay == 0 && duration == 0){
                    detailRoute['isFinished'] = true;
                }else{
                    detailRoute['isFinished'] = false;
                }
                result.push(detailRoute);
            }

        }

        return result;
    }


    var generateGantt = function(){
        //var today = new Date();
        // var today = (new Date()).getTime();

        var today = new Date();
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);

        var todayTime = today.getTime();
        var tomorrowTime = today.getTime() + 1000 * 60 * 60 * 24;

        $scope.ganttOptions = {
            rawDatas: $scope.routeDetailList,
            soltItems:	$scope.slotList,
            firstArrTime: todayTime,
            lastDepTime: tomorrowTime,
            // firstArrTime: strtotime(getFormatDateByLong($scope.parametersData.startTime * 1000, "yyyy-MM-dd hh")),
            // lastDepTime: strtotime(getFormatDateByLong($scope.parametersData.endTime * 1000, "yyyy-MM-dd hh")),
            blockWidth: 40,
            zoomScaleLabel: ["5分钟", "15分钟", "1小时"],
            zoomScale: [0.08333333, 0.25, 1],
            blockScale: 0.08333333,
            //itemInTimelineTarget: "#unassigned-bottom",
            heightChangeTarget: "#center",
            scrollerTarget: "#scoller",
            toolBarContainer: "#ganttToolBar",
            showCurrentTimeline: false,
            isLazyLoadMode: false,
            showSearcher: false,
            onDrawGanttEnd: function(event, data){
                $(".puck_block").tooltip({
                    container: 'body'
                });
            }
        };

        //$scope.$apply();
    }

}

angular
.module('piApp')
.controller('routeViewCtrl', routeViewCtrl);