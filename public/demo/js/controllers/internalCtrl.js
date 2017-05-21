function internalCtrl($scope, $modal){
    var data1 = [
        [0,4],[1,8],[2,5],[3,10],[4,4],[5,16],[6,5],[7,11],[8,6],[9,11],[10,20],[11,10],[12,13],[13,4],[14,7],[15,8],[16,12]
    ];
    var data2 = [
        [0,0],[1,2],[2,7],[3,4],[4,11],[5,4],[6,2],[7,5],[8,11],[9,5],[10,4],[11,1],[12,5],[13,2],[14,5],[15,2],[16,0]
    ];
    var data3 = [
        [0,0],[1,4],[2,6],[3,8],[4,11],[5,14],[6,12],[7,15],[8,11],[9,9],[10,8],[11,12],[12,15],[13,12],[14,9],[15,12],[16,9]
    ];

    var options = {
        series: {
            lines: {
                show: false,
                fill: true
            },
            splines: {
                show: true,
                tension: 0.4,
                lineWidth: 1,
                fill: 0.4
            },
            points: {
                radius: 0,
                show: true
            },
            shadowSize: 2
        },
        grid: {
            hoverable: true,
            clickable: true,

            borderWidth: 2,
            color: 'transparent'
        },
        colors: ["#1ab394", "#1C84C6", "#f8ac59"],
        xaxis:{
        },
        yaxis: {
        },
        tooltip: false
    };

    /**
     * Definition of variables
     * Flot chart
     */
    this.flotData = [data1, data2, data3];
    this.flotOptions = options;


    var sparkline1Data = [34, 43, 43, 35, 44, 32, 44, 52];
    var sparkline1Options = {
        type: 'line',
        width: '100%',
        height: '50',
        lineColor: '#1ab394',
        fillColor: "transparent"
    };

    var sparkline2Data = [32, 11, 25, 37, 41, 32, 34, 42];
    var sparkline2Options = {
        type: 'line',
        width: '100%',
        height: '50',
        lineColor: '#1ab394',
        fillColor: "transparent"
    };

    this.sparkline1 = sparkline1Data;
    this.sparkline1Options = sparkline1Options;
    this.sparkline2 = sparkline2Data;
    this.sparkline2Options = sparkline2Options;

    $scope.incomeList = [
        {source: "电力公司", operator: "王经理", content: "气象数据服务费用 - 企业版", date:"2017-07-10", amount: 20000},
        {source: "电力公司", operator: "王经理", content: "电量高峰大数据预测", date:"2017-07-10",amount: 25000},
        {source: "旅游公司", operator: "赵经理", content: "气象数据服务费用 - 企业版", date:"2017-07-10",amount: 20000},
        {source: "旅游公司", operator: "赵经理", content: "花期预测", date:"2017-07-10",amount: 5000},
        {source: "旅游公司", operator: "赵经理", content: "路由线路推荐", date:"2017-07-10",amount: 10000},
        {source: "交通局", operator: "陈经理", content: "气象数据服务费用 - 企业版", date:"2017-07-10",amount: 20000},
        {source: "交通局", operator: "陈经理", content: "灾害性天气预测", date:"2017-07-10",amount: 40000},
        {source: "交通局", operator: "陈经理", content: "灾害性天气恢复", date:"2017-07-10",amount: 40000},
    ]

    $scope.docList = [
        {name: "应急与减灾处关于开展汛期气象服务业务培训的通知", date:"2017-07-10 14:00", status: "已发送", progress: 50, targetList: [
            {name: "小王", date: "2017-07-10 16:30", status: "未阅读"},
            {name: "小李", date: "2017-07-10 14:30", status: "已阅读"},
            {name: "小赵", date: "2017-07-10 16:30", status: "已阅读"},
            {name: "小陈", date: "2017-07-10 15:30", status: "未阅读"}
        ]},
        {name: "春季运动会完美闭幕 公服中心硕果累累", date:"2017-07-10 14:00", status: "已发送", progress: 75, targetList: [
            {name: "小王", date: "2017-07-10 16:30", status: "已阅读"},
            {name: "小李", date: "2017-07-10 14:30", status: "已阅读"},
            {name: "小赵", date: "2017-07-10 16:30", status: "已阅读"},
            {name: "小陈", date: "2017-07-10 15:30", status: "未阅读"}
        ]},
        {name: "今夜明天本市有大雨到暴雨，降温明显", date:"2017-07-10 14:00", status: "已发送", progress: 100, targetList: [
            {name: "小王", date: "2017-07-10 16:30", status: "已阅读"},
            {name: "小李", date: "2017-07-10 14:30", status: "已阅读"},
            {name: "小赵", date: "2017-07-10 16:30", status: "已阅读"},
            {name: "小陈", date: "2017-07-10 15:30", status: "已阅读"}
        ]},
        {name: "五一天气", date:"2017-07-10 14:00", status: "已发送", progress: 100, targetList: [
            {name: "小王", date: "2017-07-10 16:30", status: "已阅读"},
            {name: "小李", date: "2017-07-10 14:30", status: "已阅读"},
            {name: "小赵", date: "2017-07-10 16:30", status: "已阅读"},
            {name: "小陈", date: "2017-07-10 15:30", status: "已阅读"}
        ]},
    ]



    $scope.showPDFModal = function () {
        var modalInstance = $modal.open({
            templateUrl: '/demo/views/modal/reader-modal.html',
            controller: 'pdfModalInstanceCtrl',
            backdrop: 'static',
            size: 'full'
        });
    }
}

function pdfModalInstanceCtrl($scope, $modalInstance) {

    $scope.pdfUrl = 'demo/pdf/example.pdf';
    $scope.httpHeaders = { Authorization: 'Bearer some-aleatory-token' };

    $scope.cancel = function(){
        $modalInstance.dismiss('cancel');
    };
}

angular
.module('piApp')
.controller('internalCtrl', internalCtrl)
.controller('pdfModalInstanceCtrl', pdfModalInstanceCtrl)
;