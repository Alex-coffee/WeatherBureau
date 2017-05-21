var areaColorMap = {
	"C": "#1c84c6",
	"D": "#ed5565",
	"E": "#f8ac59",
	"M": "#8e44ad",
	"9": "#95a5a6",
}

Gantt.prototype.generatePuck = function(target, puckData, timelineSeq){
	var isLongPuck = false;
	var isMiddlePuck = false;
	var isShortPuck = false;
	var isNewPuck = true;
	//how long is every single pixel stand for (minutes)
	var blockTimeLenth = this.datas.blockScale * 60 / this.datas.blockWidth;
	//get the offset (minutes) of the first Arr time to the first coordination
	var timeOffset = getTimeOffset(this.options.firstArrTime, this.datas.blockScale);

	//remove the current puck before
	if($(target).find("#" + puckData.id).length > 0){
		isNewPuck = false;
		$(target).find("#" + puckData.id).remove();
	}

	var puck = $("<div/>");
	puck.attr("id", puckData.id);

	puck.addClass("puck_block");
	//if the puck is a baggage puck
	if(this.type == 'baggage') puck.addClass("baggage");
	puck.css({
		width: this.datas.blockWidth,
		height: this.datas.blockWidth - 5,
	})

	var puckWidth = 0;
	var puckLeft = 0;
	var puckTop = 0;
	var slotSeq = 0;

	if(puckData.assignedSlot != undefined){
		if(this.type == 'flight'){
			slotSeq = this.datas.slotList.indexOf(puckData.assignedSlot);
		}
		puckTop = slotSeq * this.datas.blockWidth;
		puck.attr("data-assignStatus", "assigned");
	}else{
		puck.attr("data-assignStatus", "unassign");
	}

	puck.attr("data-start", puckData.onBlkTime);
	puck.attr("data-end", puckData.offBlkTime);

	puckWidth = getTotalDiffMinutes(puckData.offBlkTime, puckData.onBlkTime) / blockTimeLenth - 2;
	puckLeft = getTotalDiffMinutes(puckData.onBlkTime, this.options.firstArrTime) / blockTimeLenth + timeOffset / blockTimeLenth;

	//the puck in timeline
	if(timelineSeq != undefined && timelineSeq > -1){
		puckTop = timelineSeq * this.datas.blockWidth;
	}

	puck.css({
		"position": "absolute",
		"display": "block",
		"left": puckLeft + "px",
		"top": puckTop + "px",
		"width": puckWidth + "px",
		"border-color": (areaColorMap[puckData.gateArea] ? areaColorMap[puckData.gateArea] : "#1ab394")
	});

	puck.attr("data-toggle", "tooltip");
	puck.attr("data-placement", "top");
	puck.attr("data-html", true);

	puck.attr("title", "机型: " + puckData.fleetType);

	if(puckWidth > 35) {
		puck.text(puckData.flightNum + " 登机口" + puckData.gate + " 区域" + puckData.gateArea);
	}

	var inboundStation = $("<div/>");
	inboundStation.addClass("inboundStation");
	var inboundFltInfo = "";
	inboundFltInfo += getFormatDateByLong(puckData.onBlkTime, "hh:mm");;
	inboundStation.html(inboundFltInfo);
	puck.prepend(inboundStation);


	var outboundStation = $("<div/>");
	outboundStation.addClass("outboundStation");
	var outboundFltInfo = "";
	outboundFltInfo += getFormatDateByLong(puckData.offBlkTime, "hh:mm");
	outboundStation.html(outboundFltInfo);
	puck.append(outboundStation);



	if(puckData.delay > 0){
		var delayBlockWidth = puckData.delay / blockTimeLenth - 2;
		var delayBlock = $("<div/>");
		delayBlock.addClass("delayBlock");

		delayBlock.css({
			width: delayBlockWidth,
			height: this.datas.blockWidth - 6,
		})

		puck.prepend(delayBlock)
	}

	//set special class for puck in timeline
	if(timelineSeq != "N/A" && timelineSeq > -1){
		puck.addClass("inTimeline")
		$(target).append(puck);
	}else{
		//append the puck into table of the assigned Gate id is not null
		if(target != "" && puckData.assignedSlot != undefined && puckData.assignedSlot != '0'){
			$(target).append(puck);
		}
	}

	if(this.options.isAssigning){
		$(target).append(puck);
	}

	return puck;
}


Gantt.prototype.generateSolts = function (){
	var soltItems = this.datas.soltItems
	this.datas.slotList = [];
	$("#soltTable").html("");

	this.options.rowNumber = 0;
	if(soltItems && soltItems.length > 0){
		var table = $("<table/>");
		for(var i=0; i < soltItems.length; i++){
			//add the gate name to the array, need to get the index via name later.
			this.datas.slotList[i] = soltItems[i].groupId;

			var tr = $("<tr/>");
			var row = $("<td/>");
			row.addClass("tRow");
			row.addClass("gateRow");
			row.html("组员" + (i + 1) +
				"<br>类型: " + soltItems[i].staffGroupType + " " + (soltItems[i].driveLisence ? '需要': '不要') + "执照");

			//row can have multiple lines if the object is carousel object

			row.attr("height", this.datas.blockWidth);
			this.options.rowNumber++;

			tr.append(row);
			table.append(tr);
		}
		$("#soltTable").append(table);
	}
	$(".gateRow").popover({"container":"body"});

}

Gantt.prototype.ganttDataProcess = function($gantt){
	if($gantt){

		return new GanttItem({
			id: $gantt.id,
			fleetType: $gantt.fleetType,
			flightNum: $gantt.flightNum,
			gate: $gantt.gate,
			gateArea: $gantt.gateArea,
			groupId: $gantt.groupId,
			depTime: $gantt.depTime,
			onBlkTime: $gantt.startTime,
			offBlkTime: $gantt.endTime,
			assignedSlot: $gantt.groupId,
			index: $gantt.index ? $gantt.index : -1,
		});
	}
}
