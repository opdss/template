"use strict";
angular.module('app.applications')
.controller('sourceController', ['APP_CONFIG', '$scope', '$stateParams', '$http', '$timeout', 'tabeleForAngular', 'eChartForAngular', 'compileHtml', 'getProperty', 'peityChange', function(APP_CONFIG, $scope, $stateParams, $http, $timeout, tabeleForAngular, eChartForAngular, compileHtml, getProperty, peityChange){
	
	$scope.sys = $stateParams.sys;
	$scope.app = $stateParams.app;

	var apiUrl = {
		tableSource: '/api/source',
		peitySource: '/api/peity',
		callChart: '/api/callChart',
		sourceChart: '/api/sourceChart',
		tpChart: '/api/tpChart'
	};

	//表格存放变量地址
 	var tableSource = null;
	var dataTableSourceObj = {
		"ajax": {
       "url": apiUrl.tableSource,
       "data": function ( d ) {
           //添加额外的参数传给服务器
           d = $.extend({}, d, $scope.searchObj);
       }
    },
    "aoColumns": [
    	{},
    	{"data": "ip"},
    	{"data": "cpu"},
    	{},
    	{"data": "memory"}
    ],
    "columnDefs": [
    	{"targets": [0,3,5], "render": function(data, type, now){return "";} },
    	{"targets": [3],  "className": "none", 'sWidth':'5px'},
    	{"targets": [2,4], "render": function(data, type, now){return data.join(',');} }
    ],
    "fnRowCallback": function(nRow, aData, iDisplayIndex, iDisplayIndexFull ){
    	//此处给每一行添加操作事件
    	$('td:eq(0)', nRow).html(iDisplayIndexFull + 1);

    	var str =  '<a href="http://whatever.jd.com/source?app={{app}}">更多</a>';
    	var html = compileHtml.getCompiledHtml(str, $scope);
    	$('td:eq(5)', nRow).html(html);
    
    	var cpuPeity = $('td:eq(2)', nRow).peity("line" ); 
    	var memoryPeity = $('td:eq(4)', nRow).peity("line" ); 
    	$timeout(function(){
    		$http.get(apiUrl.peitySource).then(function(data){
    			data = data.data;
    			peityChange.peityChange(cpuPeity, data.cpu);
    			peityChange.peityChange(memoryPeity, data.memory);
    		});
    	}, 1000);
    }
	};
	function initTableSource(sys, app){
		tabeleForAngular.init(tableSource, $('#tableSource'), dataTableSourceObj, sys, app);
	}

	//eChart图存放地址
	function initChartBasic(type, saveObj, elemId, dataObj, url, prop){
		$http.get(url).then(function(data){
			data = data.data;
			data = prop ? getProperty(data, prop) : data;
			var eChartTitle = dataObj.title, 
					eChartLegend = dataObj.legend,
					xAxisData = data.time, 
					series = data.series;
			eChartForAngular[type](saveObj, elemId, eChartTitle, eChartLegend, xAxisData, series);
		});
	}
	function initChart(){
		var callChart = null, sourceChart = null, tpChart = null;
		var callChartData = {
					title: "调用量监控",
					legend: ["调用量监控"]
				}, 
				sourceChartData = {
						title: "入口占比",
						legend: ["入口占比"]
				}, 
				tpChartData ={
					title: "TP性能监控",
					legend: ["TP性能监控"]
				};
		initChartBasic("initLine", callChart, "callChart", callChartData, apiUrl.callChart);
		initChartBasic("initLine", tpChart, "tpChart", tpChartData, apiUrl.tpChart);
		initChartBasic("initPie", sourceChart, "sourceChart", sourceChartData, apiUrl.sourceChart);
	}
	


 	//app,sys改变时，可调用此方法重新初始化页面数据绑定，以及表格初始化
	function initApplication(sys, app){
		initTableSource(sys, app);
		initChart();

	}

	initApplication($scope.sys, $scope.app);

	$scope.searchObj= {
		serviceName: 'hh'
	};
	$scope.searchGo = function(){
		initApplication($scope.sys, $scope.app);
	}
}]);