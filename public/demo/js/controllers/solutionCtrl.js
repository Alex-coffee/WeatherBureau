function solutionCtrl($scope, $http, $timeout, solutionServices, $modal, $q, $filter) {
    $scope.planeInteractionArray = [];
    $scope.ganttRefreash = 0;
    $scope.showGantt = true;
    loadPage();

    $scope.openORModal = function (targetScope, action) {
        $scope.modalInstance = $modal.open({
            templateUrl: 'demo/views/modal/or-modal.html',
            controller: 'orModalInstanceCtrl',
            backdrop: "static",
            resolve: {
                confirmAction: function() {
                    return action;
                },
                targetScope : function() {
                    return targetScope;
                }
            }
        });
    }

    function loadPage(){

        solutionServices.getSolutionList().then(function (res) {
            $scope.solutionList = res.data;
            $scope.groups = [];
            $scope.tasks = [];

            var today = new Date();
            today.setHours(0);
            today.setMinutes(0);
            today.setSeconds(0);
            today.setMilliseconds(0);

            var todayTime = today.getTime();

            var groupIndex = 0;
            var taskIdIndex = 0;
            $scope.solutionList.forEach(function (groupSolution) {
                if(groupSolution == undefined) return;
                groupIndex += 1;
                $scope.groups.push({
                    groupId: "g" + groupIndex,
                    staffGroupType: groupSolution.staffGroupType,
                    driveLisence: groupSolution.driveLisence
                })

                groupSolution.task.forEach(function (groupTask) {
                    taskIdIndex += 1;
                    groupTask.id = taskIdIndex;
                    groupTask.groupId = "g" + groupIndex;
                    groupTask.startTime = todayTime + groupTask.startTime * 60 * 1000;
                    groupTask.endTime = todayTime + groupTask.endTime * 60 * 1000;
                    groupTask.depTime = todayTime + groupTask.depTime * 60 * 1000;
                    $scope.tasks.push(groupTask)
                })
            })
            $timeout(function(){
                $scope.showGantt = true;
                generateGantt();
            }, 500);
        })
    }


    var generateGantt = function(){

        var today = new Date();
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);

        var todayTime = today.getTime();
        var tomorrowTime = today.getTime() + 1000 * 60 * 60 * 24;

        $scope.ganttOptions = {
            rawDatas: $scope.tasks,
            soltItems:	$scope.groups,
            firstArrTime: todayTime,
            lastDepTime: tomorrowTime,
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

function orModalInstanceCtrl($scope, $state, $modalInstance, solutionServices) {
    $scope.orParams = {
        model: "optimize",
        shift: "M",
        staffGroup: "I",
        subGroup: "1",
        lisence: "false"
    }

    $scope.runBatchOR = function () {
        $scope.inProcess = true;
        solutionServices.runBatchOR().then(function (res) {
            $scope.inProcess = false;
            $modalInstance.close();
            $state.go("tool.gantt", {}, {reload: true});
        }, function (err) {
            $scope.inProcess = false;
            toastr.error(err.data.message);
        })
    }

    $scope.runOR = function () {
        $scope.inProcess = true;
        solutionServices.runOR($scope.orParams).then(function (res) {
            $scope.inProcess = false;
            $modalInstance.close();
            $state.go("tool.gantt", {}, {reload: true});
        }, function (err) {
            $scope.inProcess = false;
            toastr.error(err.data.message);
        })
    }
    $scope.resetResult = function () {
        $scope.inProcess = true;
        var orParams = {
            model: "reset"
        }
        solutionServices.runOR(orParams).then(function (res) {
            $scope.inProcess = false;

            solutionServices.clearSolutions().then(function (response) {
                console.log(response.data);
            })
            $modalInstance.close();
            $state.go("tool.gantt", {}, {reload: true});
        }, function (err) {
            $scope.inProcess = false;
            toastr.error(err.data.message);
        })
    }

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}

angular
    .module('piApp')
    .controller('solutionCtrl', solutionCtrl)
    .controller('orModalInstanceCtrl', orModalInstanceCtrl)
;