function parameterCtrl($scope, parameterServices){

    loadData();

    $scope.save = function(){

        if($("#paramForm").valid()){
            parameterServices.saveParameter($scope.parameters).then(function(result){
                if(result.data.status == "success"){
                    toastr.success(result.data.message);
                }
            })
        }

    }

    function loadData(){
        parameterServices.getParameterData().then(function(result){
            $scope.parameters = result.data;
        });
    }
}

angular
.module('piApp')
.controller('parameterCtrl', parameterCtrl);