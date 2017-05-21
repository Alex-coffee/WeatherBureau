function reportServices($http, $q, $cookies){

    var getCommits = function(){
        return $http.get("/api/getCommits");
    }

    var getKPIByCommits = function(commitName){
        return $http.get("/api/getCommitKpi?commitName=" + commitName);
    }

    var getBaseline = function(){
        return $http.get("/api/getBaseline");
    }

    var getBaseValue = function(){
        var kpiBase = $cookies.get('kpiBase');
        if(kpiBase) kpiBase = jQuery.parseJSON(kpiBase);
        return kpiBase;
    }

    var setBaseValue = function(baseObj){
        $cookies.put('kpiBase', JSON.stringify(baseObj));
    }

    var getDetailBaseValue = function(bases){
        var result;
        for(var i in bases){
            var kpiBaseDetail = $cookies.get('kpiBaseDetail_' + bases[i]);
            if(kpiBaseDetail){
                if(result == undefined) result = {};
                result[bases[i]] = jQuery.parseJSON(kpiBaseDetail)
            }
        }
        return result;
    }

    var setDetailBaseValue = function(baseObj){
        for(var base in baseObj){
            $cookies.put('kpiBaseDetail_' + base, JSON.stringify(baseObj[base]));
        }
    }

    var generateBaseline = function(baseline){
        return $http.post("/api/writeBaseline", baseline);
    }

    return{
        getCommits: getCommits,
        getKPIByCommits: getKPIByCommits,
        getBaseline: getBaseline,
        getBaseValue: getBaseValue,
        setBaseValue: setBaseValue,
        getDetailBaseValue: getDetailBaseValue,
        setDetailBaseValue: setDetailBaseValue,
        generateBaseline: generateBaseline,
    }
}

angular
.module('piApp')
.factory('reportServices', reportServices);

