//demands
function routingServices($http, $location, $q){
    var coords = {};
    var absUrl = $location.absUrl();

    var getAllData = function(){
        var deferred = $q.defer();
        $http.get("demo/data/AircraftRoutingResultJson.json")
            .success(function(data){
                deferred.resolve({
                    data : data
                });
            })
        return deferred.promise;
    }

    var getNodeData = function(){
        return $http.get("demo/data/output/airportNode.json");
    }

    var getCoordinateData = function(){
        return $http.get("demo/data/output/json/coordinates.json");
    }

    var getRouterData = function(){
        return $http.get("demo/data/output/json/routers.json");
    }

    var getParameterData = function(){
        return $http.get("demo/data/Parameter.json");
    }

    var getCoords = function(){
        return $http.get("demo/data/output/json/indexMapping.json");
    }

    var timeUnit = 1000;
    function generateRoutePoints(routeList){
        var result = [];
        var timeArray = [];

        for(var i = 0; i < routeList.length; i++){
            var planeRoute = routeList[i];
            var routeSize = planeRoute.Route.length;
            for(var j = 0; j < routeSize; j++){
                timeArray.push(planeRoute.ArrTime[j]);
                timeArray.push(planeRoute.DepTime[j]);
            }
        }

        var startTime = timeArray.sort(function (a,b) {
            return a - b;
        })[0];

        for(var i = 0; i < routeList.length; i++){
            var flightRoute = {};

            var planeRoute = routeList[i];
            var routeSize = planeRoute.Route.length;

            flightRoute['flight'] = planeRoute.Flight;
            flightRoute['type'] = planeRoute.Type;
            flightRoute['points'] = [];

            for(var j = 0; j < routeSize; j++){
                var routePoint = {};

                var point = planeRoute.Route[j];
                routePoint['point'] = point;

                var delay = 0;
                var duration = 0;
                if(j == 0){
                    delay = planeRoute.ArrTime[j] - startTime;
                    duration = 0;
                }else{
                    duration = planeRoute.ArrTime[j] - planeRoute.DepTime[j - 1];
                    delay = planeRoute.DepTime[j - 1] - planeRoute.ArrTime[j - 1] - duration;
                }

                routePoint['delay'] = delay * timeUnit;
                routePoint['duration'] = duration * timeUnit;

                flightRoute['points'].push(routePoint);
            }

            result.push(flightRoute);
        }
        return result;
    }

    //speed to perform the move action, for example: move 400 distance in 4 seconds
    //move speed stand for the duration for 1 distance
    var moveSpeed = 4000 / 400;

    var getDistance = function(dot1, dot2){
        var result = 0;
        var dx = dot2.x - dot1.x;
        var dy = dot2.y - dot1.y;
        result = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
        return result;
    }
    var routePoints = [];

    function playRoute(routePoints, scope){
        getCoords().then(function (result) {
            var coordList = result.data;
            if(coordList.length > 0){

                for(var i = 0; i < coordList.length; i++){
                    var c = coordList[i];
                    coords[c.index] = {x: c.x, y: c.y};
                }

                var transformAttr = $("#route").attr("transform");
                var routeGroup = makeSVG('g', {id: "routeGroup",transform: transformAttr});
                var flightLabelGroup = makeSVG('text', {id: "flghtLabelGroup",transform: transformAttr});

                $("#routeGroup").remove();
                $("#flghtLabelGroup").remove();

                document.getElementById("ChongqingAirport").appendChild(routeGroup);
                document.getElementById("ChongqingAirport").appendChild(flightLabelGroup);

                //clear the interaction list
                if(scope.planeInteractionArray){
                    scope.planeInteractionArray = [];
                }
                for(var i = 0; i < routePoints.length; i++){
                    generatePlaneRoute(routeGroup, flightLabelGroup, routePoints[i], routePoints[i].points, scope.planeInteractionArray);
                }
            }
        })
    }

    function generatePlaneRoute(routeGroupContainer, flightLabelGroupContainer, routePoint, actionArray, planeInteractionArray){
        //{point:0, delay: 1000}
        var startPoint = coords[actionArray[0].point];

        var planes = $("#routeGroup").find("circle");

        var fillColor = "#ed5565";
        var offsetX = -10;
        var offsetY = 5;

        if(routePoint.type == "VEHICLE"){
            fillColor = "#1c84c6";
        }

        var dot = makeSVG('circle', {cx: startPoint.x, cy: startPoint.y, r:5, opacity: 0, flight: routePoint.flight});
        var planeDot = makeSVG('tspan', {x: startPoint.x - 20, y: startPoint.y + 5, opacity: 0,  fill: fillColor});

        var flightLabel= makeSVG('tspan', {x: startPoint.x + 10, y: startPoint.y - 10, opacity: 0,  fill: '#000000'});
        flightLabel.innerHTML = routePoint.flight;

        if(routePoint.type == "VEHICLE"){
            planeDot.innerHTML = "&#xf0d1";
        }else{
            planeDot.innerHTML = "&#xf072";
            planeDot.setAttribute("class", "planeIcon");
        }

        routeGroupContainer.appendChild(dot);
        flightLabelGroupContainer.appendChild(planeDot);
        flightLabelGroupContainer.appendChild(flightLabel);

        var routes = [];
        for(var i = 0; i < actionArray.length; i++) {
            var route = {}
            var point = {};
            var delay = 0;
            var duration = 0;
            if (actionArray[i].delay != undefined) {
                delay = actionArray[i].delay;
            }

            if (actionArray[i].duration != undefined) {
                duration = actionArray[i].duration;
            }
            point = {
                x: coords[actionArray[i].point].x + offsetX,
                y: coords[actionArray[i].point].y + offsetY,
            };
            route['point'] = point;
            route['delay'] = delay;
            route['duration'] = duration;

            routes.push(route);
        }

        for(var i = 0; i < routes.length; i++){


            if( i == 0){//start point
                $(dot).velocity({
                        cx: routes[i].point.x - offsetX,
                        cy: routes[i].point.y - offsetY,
                        opacity: 1
                    },
                    {
                        easing: [ 0,0,1,1 ],
                        delay: routes[i].delay,
                        duration: routes[i].duration
                    }
                )

                $(planeDot).velocity({
                        x: routes[i].point.x,
                        y: routes[i].point.y,
                        opacity: 1
                    },
                    {
                        easing: [ 0,0,1,1 ],
                        delay: routes[i].delay,
                        duration: routes[i].duration
                    }
                )

                $(flightLabel).velocity({
                        x: routes[i].point.x + 10,
                        y: routes[i].point.y - 10,
                        opacity: 1
                    },
                    {
                        easing: [ 0,0,1,1 ],
                        delay: routes[i].delay,
                        duration: routes[i].duration
                    }
                )

            }else if( i == routes.length - 1){//end point
                var disappearTimeout = 0;
                if(routePoint.type == "VEHICLE"){
                    disappearTimeout = 5000;
                }

                $(dot).velocity({
                        cx: routes[i].point.x - offsetX,
                        cy: routes[i].point.y - offsetY,
                        opacity: 1
                    },
                    {
                        easing: [ 0,0,1,1 ],
                        delay: routes[i].delay,
                        duration: routes[i].duration
                    }
                ).velocity({opacity: 0}, {delay: disappearTimeout});

                $(planeDot).velocity({
                        x: routes[i].point.x,
                        y: routes[i].point.y,
                    },
                    {
                        easing: [ 0,0,1,1 ],
                        delay: routes[i].delay,
                        duration: routes[i].duration
                    }
                ).velocity({opacity: 0}, {delay: disappearTimeout});

                $(flightLabel).velocity({
                        x: routes[i].point.x + 10,
                        y: routes[i].point.y - 10
                    },
                    {
                        easing: [ 0,0,1,1 ],
                        delay: routes[i].delay,
                        duration: routes[i].duration
                    }
                ).velocity({opacity: 0}, {delay: disappearTimeout});

            }else{
                $(dot).velocity({
                        cx: routes[i].point.x - offsetX,
                        cy: routes[i].point.y - offsetY,
                        opacity: 1
                    },
                    {
                        easing: [ 0,0,1,1 ],
                        delay: routes[i].delay,
                        duration: routes[i].duration,
                        begin: function(elements) {
                            $(elements[0]).attr("moving", true);
                        },
                        complete: function(elements) {
                            $(elements[0]).removeAttr("moving");
                        },
                        progress: function(elements, complete, remaining, start, tweenValue) {
                            for(var index = 0; index < planes.length; index++){
                                var intersection = Intersection.intersectShapes(new Circle(planes[index]), new Circle(elements[0]));

                                if(intersection.status == "Intersection"){
                                    if(planeInteractionArray.indexOf($(elements[0]).attr("flight")+ " conflict to " + $(planes[index]).attr("flight")) < 0 &&
                                        planeInteractionArray.indexOf($(planes[index]).attr("flight") + " conflict to " + $(elements[0]).attr("flight")) < 0){
                                        if(($(elements[0]).attr("moving") == "true" && $(planes[index]).attr("moving") == "true"))
                                            planeInteractionArray.push($(elements[0]).attr("flight")+ " conflict to " + $(planes[index]).attr("flight") );
                                    }
                                }
                            }
                        }
                    }
                )

                $(planeDot).velocity({
                        x: routes[i].point.x,
                        y: routes[i].point.y
                    },
                    {
                        easing: [ 0,0,1,1 ],
                        delay: routes[i].delay,
                        duration: routes[i].duration
                    }
                )

                $(flightLabel).velocity({
                        x: routes[i].point.x + 10,
                        y: routes[i].point.y - 10
                    },
                    {
                        easing: [ 0,0,1,1 ],
                        delay: routes[i].delay,
                        duration: routes[i].duration
                    }
                )
            }

        }
    }

    function generateUnlinkedNode(unlinkNodes){

        for(var i = 0; i < unlinkNodes.length; i++){
            var point1 = unlinkNodes[i].from;
            var point2 = unlinkNodes[i].to;

            var isBothOff = false;
            for(var j = 0; j < unlinkNodes.length; j++){
                var _point1 = unlinkNodes[j].from;
                var _point2 = unlinkNodes[j].to;
                //compare the points, skip the same point and generate red line if the paths are both off
                if(point1.x == _point2.x && point1.y == _point2.y){
                    isBothOff = true;
                    break;
                }
            }
            if(isBothOff){
                var atti = "M" + point2.x + "," + point2.y + " L" + point1.x + "," + point1.y;
                var path = makeSVG('path', {d: atti, stroke: "#ed5565",  "stroke-linecap": 'square'});

                document.getElementById("route").appendChild(path);
            }else{
                var atti = "M" + point2.x + "," + point2.y + " L" + point1.x + "," + point1.y;
                var path = makeSVG('path', {d: atti, stroke: "#1ab394",  "stroke-linecap": 'square', "style": "marker-end: url('#markerArrow')"});

                document.getElementById("route").appendChild(path);
            }
        }
    }

    function markArrOnly(nodes){
        markRoute(nodes, "arrOnly");
    }

    function markDepOnly(nodes){
        markRoute(nodes, "depOnly");
    }

    function markRoute(nodes, type){
        var color = "#1ab394";
        var marker = "#markerArrow";
        var storkWidth = 1;
        if(type == "arrOnly"){
            color = "#e67e22";
            marker = "#arrOnlyArrow";
            storkWidth = 1.5;
        }
        if(type == "depOnly"){
            color = "#3498db";
            marker = "#depOnlyArrow";
        }

        for(var i = 0; i < nodes.length; i++){
            var point1 = nodes[i].from;
            var point2 = nodes[i].to;
            var atti = "M" + point1.x + "," + point1.y + " L" + point2.x + "," + point2.y;
            var path = makeSVG('path',
                {
                    d: atti,
                    stroke: color,
                    "stroke-width": storkWidth,
                    "stroke-linecap": 'square',
                    "opacity" : 0.9,
                    "style": "marker-end: url(" + marker + ")"
                });
            document.getElementById("route").appendChild(path);
        }
    }

    function showCoordinate(){
        // $("#result").html($("#route").find("path").length)

        getCoordinateData().then(function(result){
            var intersectionPoints = result.data;
            appendDots("route", intersectionPoints);
        });
    }

    function generateNode(){
        var paths = $("#route").find("path");

        var intersectionPoints = [];
        for(var i = 0; i < paths.length; i++){
            var pathA = paths[i];

            for(var j = 0; j < paths.length; j++){
                var pathB = paths[j];
                var intersection = Intersection.intersectShapes(new Path(pathA), new Path(pathB));
                if(intersection.status == "Intersection"){
                    for(var index = 0; index < intersection.points.length; index++){
                        var point = {
                            x: intersection.points[index].x,
                            y: intersection.points[index].y
                        }
                        checkDuplicatePoint(intersectionPoints, point);
                    }
                }
            }
        }

        intersectionPoints.sort(orderByProperty('y', 'x'));
        //generate SVG intersection coordinates


        var points = [];
        for(var i = 0; i < intersectionPoints.length; i++){
            var point = intersectionPoints[i];
            points.push({
                index: i,
                x: point.x,
                y: point.y
            });
        }

        //generate routers
        var routers = generateRouters(intersectionPoints);

        var promises = [];
        var defer1 = $q.defer();
        saveJSON("coordinates.json", intersectionPoints).then(function(result){
            defer1.resolve(result);
            })
        promises.push(defer1.promise);

        var defer2 = $q.defer();
        saveJSON("routers.json", routers).then(function(result){
            defer2.resolve(result);
        })
        promises.push(defer2.promise);

        var defer3 = $q.defer();
        var coordIndexList = [];
        for(var i = 0; i < intersectionPoints.length; i++){
            coordIndexList.push({
                index: i,
                x: intersectionPoints[i].x,
                y: intersectionPoints[i].y
            })
        }
        saveJSON("indexMapping.json", coordIndexList).then(function(result){
            defer3.resolve(result);
        });
        promises.push(defer3.promise);

        generateORFile("airportNode.json", coordIndexList)

        var defer4 = $q.defer();
        var routerList = [];
        for(var i = 0; i < routers.length; i++){
            if(getNodeIndex(routers[i].from, coordIndexList) == undefined){
                console.log("undefined");
            }
            routerList[i] = {
                from: getNodeIndex(routers[i].from, coordIndexList),
                to: getNodeIndex(routers[i].to, coordIndexList),
                isActived: routers[i].isActived,
                distance: routers[i].distance,
                arrOnly: routers[i].arrOnly,
                depOnly: routers[i].depOnly
            };
        }
        saveJSON("link.json", routerList).then(function(result){
            defer4.resolve(result);
        });
        promises.push(defer4.promise);

        generateORFile("link.json", routerList)

        return $q.all(promises).then(function (result){
            var message = "操作失败";
            var isSuccess = false;
            if(result[0].data.status == "success" && result[1].data.status == "success"){
                message = "操作成功";
                isSuccess = true;
            }

            var def = $q.defer();
            def.resolve({
                isSuccess: isSuccess,
                message: message
            });
            return def.promise;
        });
    }

    function saveJSON(fileName, list){
        return $http.post("/api/saveJSON", {fileName: fileName, content: list});
    }

    function generateORFile(fileName, list){
        return $http.post("/api/generateORFile", {fileName: fileName, content: list});
    }

    function saveRouters(routerList){
        return $http.post("/api/writeRouter/", routerList);
    }

    function createRouters(routerList){
        return $http.post("/api/saveRouter", routerList);
    }

    function saveParameter(parameter){
        return $http.post("/api/saveParameter/", parameter);
    }

    function checkDuplicatePoint(target, point){
        var isAppend = true;

        for(var i = 0; i < target.length; i++){
            if(target[i].x == point.x && target[i].y == point.y){
                isAppend = false;
                break;
            }else if(Math.abs(target[i].x - point.x) < 2 && Math.abs(target[i].y - point.y) < 2){
                isAppend = false;
                break;
            }
        }

        if(isAppend){
            target.push(point);
        }
    }

    function appendDots(container, intersectionPoints){
        var dotsMap = {};
        var textContainer = makeSVG('text', {id: "textContainer" , "font-size": 12, fill: '#0000FF'});
        document.getElementById(container).appendChild(textContainer);

        for(var i = 0; i < intersectionPoints.length; i++){
            var point = intersectionPoints[i];
            var circle= makeSVG('circle', {cx: point.x, cy: point.y, r:2, fill: '#1ab394'});
            var tspan= makeSVG('tspan', {x: point.x + 10, y: point.y - 10, fill: '#000000'});
            tspan.innerHTML = i;
            document.getElementById(container).appendChild(circle);
            document.getElementById("textContainer").appendChild(tspan);

            dotsMap[i] = {
                x: point.x,
                y: point.y
            }
            routePoints.push(circle);
        }
        return dotsMap;

    }

    function generateResult(intersectionPoints){
        var result = "";
        for(var i = 0; i < intersectionPoints.length; i++){
            var point = intersectionPoints[i];
            result += i + "," + point.x + "," + point.y + "<br>"
        }
        $("#result").html(result);
    }

    function generateRouters(intersectionPoints){
        var pathIntersections = {};
        var paths = $("#route").find("path");

        for(var i = 0; i < paths.length; i++){
            var pathA = paths[i];
            // if(paths[i].id.indexOf("endpoint") < 0){
                pathIntersections[paths[i].id] = {};
                var pathInterSectionArray = [];

                for(var j = 0; j < routePoints.length; j++){
                    var pathB = routePoints[j];
                    var intersection = Intersection.intersectShapes(new Path(pathA), new Circle(pathB));
                    if(intersection.status == "Intersection"){
                        var point = {
                            x: pathB.cx.baseVal.value,
                            y: pathB.cy.baseVal.value
                        }
                        checkDuplicatePoint(pathInterSectionArray, point);
                        // intersectionPoints.push(intersection.points);
                    }
                }
                //sort the points
                pathInterSectionArray.sort(routeSort);
                pathIntersections[paths[i].id] = pathInterSectionArray;
            // }
        }

        //print out the dots
        var result = [];
        for(var key in pathIntersections){

            for(var i = 0; i < pathIntersections[key].length - 1; i++){
                result.push({
                    // from: getPointIndex(pathIntersections[key][i], intersectionPoints),
                    // to: getPointIndex(pathIntersections[key][i + 1], intersectionPoints),
                    from: getPointCoordinate(pathIntersections[key][i], intersectionPoints),
                    to: getPointCoordinate(pathIntersections[key][i + 1], intersectionPoints),
                    isActived: true,
                    distance: getDistance(pathIntersections[key][i], pathIntersections[key][i + 1]),
                    arrOnly: false,
                    depOnly: false
                });

                result.push({
                    // from: getPointIndex(pathIntersections[key][i + 1], intersectionPoints),
                    // to: getPointIndex(pathIntersections[key][i], intersectionPoints),
                    from: getPointCoordinate(pathIntersections[key][i + 1], intersectionPoints),
                    to: getPointCoordinate(pathIntersections[key][i], intersectionPoints),
                    isActived: true,
                    distance: getDistance(pathIntersections[key][i + 1], pathIntersections[key][i]),
                    arrOnly: false,
                    depOnly: false
                });
            }
        }
        return result;
        //$("#routes").html(result);
    }

    function getPointCoordinate(point, sourceList){
        var result;
        for(var i = 0; i < sourceList.length; i++){
            if(sourceList[i].x == point.x && sourceList[i].y == point.y){
                result = sourceList[i];
                break;
            }else if(Math.abs(sourceList[i].x - point.x) < 0.1 && Math.abs(sourceList[i].y - point.y) < 0.1){
                result = sourceList[i];
                break;
            }
        }
        if(!result){
            result = point;
        }
        return result;
    }

    function getPointIndex(point, sourceList){
        var result;
        for(var i = 0; i < sourceList.length; i++){
            if(sourceList[i].x == point.x && sourceList[i].y == point.y){
                result = i;
                break;
            }else if(Math.abs(sourceList[i].x - point.x) < 0.1 && Math.abs(sourceList[i].y - point.y) < 0.1){
                result = i;
                break;
            }
        }
        return result;
    }

    function makeSVG(tag, attrs) {
        var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
        for (var k in attrs)
            el.setAttribute(k, attrs[k]);
        return el;
    }

    function routeSort(a, b) {
        if (a.x - b.x < 0) {
            return -1;
        }else if(a.x - b.x == 0){
            if (a.y - b.y < 0) {
                return -1;
            }else{
                return 1;
            }
        }else{
            return 1
        }
    }

    function getNodeIndex(point, source){
        var result;
        for(var i = 0; i < source.length; i++){
            if(point.x == source[i].x && point.y == source[i].y){
                result = source[i].index;
                break;
            }
        }
        return result;
    }

    return{
        getAllData: getAllData,
        getNodeData: getNodeData,
        getCoordinateData: getCoordinateData,
        getRouterData: getRouterData,
        getParameterData: getParameterData,
        showCoordinate: showCoordinate,
        generateRoutePoints: generateRoutePoints,
        generateUnlinkedNode: generateUnlinkedNode,
        markArrOnly: markArrOnly,
        markDepOnly: markDepOnly,
        generateNode: generateNode,
        saveJSON: saveJSON,
        generateORFile: generateORFile,
        saveRouters: saveRouters,
        saveParameter: saveParameter,
        getNodeIndex: getNodeIndex,
        playRoute: playRoute
    }
}

angular
.module('piApp')
.factory('routingServices', routingServices);

