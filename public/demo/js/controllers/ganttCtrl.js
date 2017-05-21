function ganttCtrl($scope, $modal, solutionServices, flightServices, vehicleServices, $http, $q, $timeout){
    $scope.dataList = [];
    $scope.vehicleList = [];

    loadData();

    function loadData(){

        //var vpromise = vehicleServices.getAllData();
        //vpromise.then(function(result){
        //    $scope.vehicleList = result.data;
        //});

        solutionServices.getAircraftRoutingSolution().then(function(result){
            var deferred = $q.defer();
            deferred.resolve(result);
            return deferred.promise;
        }).then(function(result){
            var deferred = $q.defer();
            var solutionList = result;

            flightServices.getFlightData().then(function(result){
                var flightList = result;
                $scope.flightList = [];
                var flightMap = {};

                var index = 0;
                for(var i=0; i< flightList.length; i++){
                    flightMap[flightList[i].Flight] = {
                        ArrTime: flightList[i].ArrTime,
                        DepTime: flightList[i].DepTime,
                    }


                    for(var j = 0; j < solutionList.length; j++){
                        if($scope.flightList.indexOf(flightList[i].Flight) < 0)
                            $scope.flightList.push(flightList[i].Flight);

                        if(flightList[i].Flight == solutionList[j].Flight){
                            var obj = angular.copy(flightList[i]);
                            obj.id = index++;
                            obj.type = "flight",
                                $scope.dataList.push(obj);
                        }
                    }

                }
                deferred.resolve(flightMap);
            });

            return deferred.promise;

        }).then(function(result){
            var flightMap = result;

            vehicleServices.getVehicleData().then(function(result){
                var vehicleList = result.data;
                var vIndex = 1000;

                for(var i=0; i< vehicleList.length; i++){
                    var obj = angular.copy(vehicleList[i]);
                    obj.id = vIndex++;
                    obj.type = "vehicle",
                        obj.Flight = vehicleList[i].ServiceFlight;
                    obj.ArrTime = vehicleList[i].StartTime;
                    obj.DepTime = flightMap[vehicleList[i].ServiceFlight].DepTime + 1;
                    $scope.dataList.push(obj);
                }

                $scope.dataList.sort(function(b, a){
                    return b.ArrTime - a.ArrTime;
                })

                generateGantt();
            })

        });

    }

    var generateGantt = function(){
        //var today = new Date();
        var today = (new Date()).getTime();

        $scope.ganttOptions = {
            rawDatas: $scope.dataList,
            soltItems:	$scope.flightList,
            firstArrTime: strtotime(getFormatDateByLong(today + 200 * 60 * 1000, "yyyy-MM-dd hh")),
            lastDepTime: strtotime(getFormatDateByLong(today + 1325 * 60 * 1000 + 1000*3600*6, "yyyy-MM-dd hh")),
            blockWidth: 40,
            zoomScaleLabel: ["15分钟", "1小时", "2小时", "3小时"],
            zoomScale: [0.25, 1, 2, 3],
            blockScale: 0.25,
            //itemInTimelineTarget: "#unassigned-bottom",
            heightChangeTarget: "#center",
            scrollerTarget: "#scoller",
            toolBarContainer: "#ganttToolBar",
            showCurrentTimeline: false,
            isLazyLoadMode: false,
            showSearcher: false,
            onDrawGanttStart: function(event, data){

            },
            onDrawGanttEnd: function(event, data){
                $(".puck_block").tooltip({
                    container: 'body'
                });
            },
            onPuckSelected: function(event, data){

            },
            onPuckAssigned: function(event, data){
                //var result = {
                //    "id" : data.id,
                //    "tailNo" : data.slotName
                //}
                var puck = processAssignedPuck(data.id, data.slotName);
                //console.log(result);
            },
            onUnassignedPuckActivated: function(event){
                //close the bottom panel
                $("#bottom-sidebar").removeClass('sidebar-open');
            },
            onPuckSwapped: function(event, data){
                $("#ganttAssignedParam").val(data.param);
                $("#ganttSwapBtn").click();
            },
            onViolationUpdated: function(){

            }
        };

        //$scope.$apply();
    }
}

angular
.module('piApp')
.controller('ganttCtrl', ganttCtrl);