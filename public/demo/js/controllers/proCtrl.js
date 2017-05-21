function proCtrl($scope){
    $scope.weatherList = [
        {date: "周二 (23)", weatherIcon: ["wi-cloudy", "wi-showers"], weather: "阴转小雨", temp:"29℃ / 20℃", windDirection: "东南风", windLevel: "3-4级转微风"},
        {date: "周三 (24)", weatherIcon: ["wi-showers", "wi-rain"], weather: "小雨转中雨", temp:"29℃ / 20℃", windDirection: "北风", windLevel: "3-4级转微风"},
        {date: "周四 (25)", weatherIcon: ["wi-cloudy", "wi-cloud"], weather: "阴转多云", temp:"29℃ / 20℃", windDirection: "东南风", windLevel: "3-4级转微风"},
        {date: "周五 (26)", weatherIcon: ["wi-cloudy"], weather: "多云", temp:"29℃ / 20℃", windDirection: "北风", windLevel: "3-4级转微风"},
    ]

    var data1 = [
        [gd(2017, 7, 16), 28],
        [gd(2017, 7, 17), 28],
        [gd(2017, 7, 18), 31],
        [gd(2017, 7, 19), 31],
        [gd(2017, 7, 20), 36],
        [gd(2017, 7, 21), 36],
        [gd(2017, 7, 22), 38],
        [gd(2017, 7, 23), 33],
        [gd(2017, 7, 24), 33],
        [gd(2017, 7, 25), 37],
        [gd(2017, 7, 26), 39],
        [gd(2017, 7, 27), 39],
        [gd(2017, 7, 28), 38],
        [gd(2017, 7, 29), 35],
        [gd(2017, 7, 30), 38],
        [gd(2017, 7, 31), 35]
    ];

    var data2 = [
        [gd(2017, 7, 16), 4908],
        [gd(2017, 7, 17), 4788],
        [gd(2017, 7, 18), 5341],
        [gd(2017, 7, 19), 5531],
        [gd(2017, 7, 20), 7986],
        [gd(2017, 7, 21), 4236],
        [gd(2017, 7, 22), 5038],
        [gd(2017, 7, 23), 4833],
        [gd(2017, 7, 24), 5233],
        [gd(2017, 7, 25), 5837],
        [gd(2017, 7, 26), 8139],
        [gd(2017, 7, 27), 8239],
        [gd(2017, 7, 28), 8638],
        [gd(2017, 7, 29), 7235],
        [gd(2017, 7, 30), 6438],
        [gd(2017, 7, 31), 6035]
    ];

    var data3 = [
        [gd(2017, 3, 16), 14],
        [gd(2017, 3, 17), 15],
        [gd(2017, 3, 18), 12],
        [gd(2017, 3, 19), 15],
        [gd(2017, 3, 20), 16],
        [gd(2017, 3, 21), 12],
        [gd(2017, 3, 22), 17],
        [gd(2017, 3, 23), 18],
        [gd(2017, 3, 24), 12],
        [gd(2017, 3, 25), 17],
        [gd(2017, 3, 26), 14],
        [gd(2017, 3, 27), 12],
        [gd(2017, 3, 28), 17],
        [gd(2017, 3, 29), 18],
        [gd(2017, 3, 30), 20],
        [gd(2017, 3, 31), 18]
    ];


    var dataset = [
        {
            label: "电力负荷",
            grow:{stepMode:"linear"},
            data: data2,
            color: "#1ab394",
            bars: {
                show: true,
                align: "center",
                barWidth: 24 * 60 * 60 * 600,
                lineWidth: 0
            }

        },
        {
            label: "气温",
            grow:{stepMode:"linear"},
            data: data1,
            yaxis: 2,
            color: "#1C84C6",
            lines: {
                lineWidth: 1,
                show: true,
                fill: true,
                fillColor: {
                    colors: [
                        {
                            opacity: 0.2
                        },
                        {
                            opacity: 0.2
                        }
                    ]
                }
            }
        }
    ];

    var dataset2 = [
        {
            label: "气温",
            grow:{stepMode:"linear"},
            data: data3,
            yaxis: 2,
            color: "#1ab394",
            lines: {
                lineWidth: 1,
                show: true,
                fill: true,
                fillColor: {
                    colors: [
                        {
                            opacity: 0.2
                        },
                        {
                            opacity: 0.2
                        }
                    ]
                }
            }
        }
    ];


    var options = {
        grid: {
            hoverable: true,
            clickable: true,
            tickColor: "#d5d5d5",
            borderWidth: 0,
            color: '#d5d5d5'
        },
        colors: ["#1ab394", "#464f88"],
        tooltip: true,
        xaxis: {
            mode: "time",
            tickSize: [3, "day"],
            tickLength: 0,
            axisLabel: "Date",
            axisLabelUseCanvas: true,
            axisLabelFontSizePixels: 12,
            axisLabelFontFamily: 'Arial',
            axisLabelPadding: 10,
            color: "#d5d5d5"
        },
        yaxes: [
            {
                position: "left",
                max: 9000,
                color: "#d5d5d5",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Arial',
                axisLabelPadding: 3
            },
            {
                position: "right",
                max: 45,
                color: "#d5d5d5",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: ' Arial',
                axisLabelPadding: 67
            }
        ],
        legend: {
            noColumns: 1,
            labelBoxBorderColor: "#d5d5d5",
            position: "nw"
        }

    };

    var options2 = {
        grid: {
            hoverable: true,
            clickable: true,
            tickColor: "#d5d5d5",
            borderWidth: 0,
            color: '#d5d5d5'
        },
        colors: ["#1ab394", "#464f88"],
        tooltip: true,
        xaxis: {
            mode: "time",
            tickSize: [3, "day"],
            tickLength: 0,
            axisLabel: "Date",
            axisLabelUseCanvas: true,
            axisLabelFontSizePixels: 12,
            axisLabelFontFamily: 'Arial',
            axisLabelPadding: 10,
            color: "#d5d5d5"
        },
        yaxes: [
            {
                position: "left",
                max: 40,
                color: "#d5d5d5",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: ' Arial',
                axisLabelPadding: 67
            }
        ],
        legend: {
            noColumns: 1,
            labelBoxBorderColor: "#d5d5d5",
            position: "nw"
        }

    };

    function gd(year, month, day) {
        return new Date(year, month - 1, day).getTime();
    }

    this.flotData = dataset;
    this.flotOptions = options;

    this.flotData2 = dataset2
    this.flotOptions2 = options2;

    var mapData = {
        "CN-31": 1000,
        "CN-32": 300,
        "CN-33": 500,
        "CN-34": 700,
        "CN-35": 800,
        "CN-36": 1200,
        "CN-37": 1400,
        "CN-": 1400
    }

    this.mapData = mapData;
    $scope.scaleColor = ["#cbe6f7", "#1c84c6"];

    $scope.warningList = [
        {province: "江苏省", road: "324国道", section: "243至314", weatherIcon: ["wi-snow-wind", "wi-showers"], timeRange:"1月15日至1月24日", level: "danger"},
        {province: "浙江省", road: "京沪高速", section: "65至214", weatherIcon: ["wi-fog"], timeRange:"1月25日至2月14日", level: "danger"},
        {province: "山东省", road: "124国道", section: "543至714", weatherIcon: ["wi-snow-wind"], timeRange:"1月17日至1月30日", level: "warning"},
        {province: "江苏省", road: "324国道", section: "243至314", weatherIcon: ["wi-snow-wind"], timeRange:"1月24日至2月07日", level: "warning"},
        {province: "江苏省", road: "321国道", section: "全路段", weatherIcon: ["wi-rain"], timeRange:"2月14日至2月27日", level: "warning"},
        {province: "江苏省", road: "京沪高速", section: "65至214", weatherIcon: ["wi-showers"], timeRange:"6月14日至6月27日", level: "minor"},
    ]

    var mapData2 = {
        "CN-63": 800,
        "CN-51": 600,
        "CN-54": 1000,
    }
    this.mapData2 = mapData2;

    $scope.tourList = [
        {title: "拉萨—米拉山口", description: "米拉山口海拔5013米，站在山口山风劲吹，在蓝天白云下山口处常年积雪，发育有远古时期冰川活动遗迹，因为海拔较高不宜做长时间停留。"},
        {title: "米拉山口－色季拉山", description: "色季拉山，属念青唐古拉山脉，是尼洋河流域与帕龙藏布江的分水岭，为川藏公路所跨越。登临海拔4728米处的山口，可观日出、云海、无际的林海和远眺南迦巴瓦峰峻美的雄姿。"},
        {title: "鲁朗林海（途经）—岗云杉林", description: "途经鲁朗林海，是一处云山雾海里的森林，有\"叫人不想家的\"的美誉，整个景点如诗如画，周边雪山林立，沟内森林葱笼，林间还有整齐如人工修剪般的草甸，许多民居修建在这山环水复的天上森林，周边溪流蜿蜒，有成千上万种野花竞相开放，简直就是人间天堂。晚上宿岗云杉林度假村。"}
    ];

    $scope.flowerList = [
        {name: "油菜花", timeRange:"3月8日至4月15日", location: "江西婺源，云南罗平"},
        {name: "桃花", timeRange:"2月26日至3月15日", location: "西藏林芝，广东清远连州，安徽歙县"},
        {name: "樱花", timeRange:"3月25日至4月10日", location: "北京居庸关，福建漳平永福，西安青龙寺"},
        {name: "梨花", timeRange:"4月05日至4月24日", location: "河北赵县，四川丹巴，安徽砀山"},
    ];
}

angular
.module('piApp')
.controller('proCtrl', proCtrl);