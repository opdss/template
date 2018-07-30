"use strict";
angular.module('app.applications')
.controller('entryController', ['APP_CONFIG', '$scope', '$stateParams', '$http', '$timeout', 'tabeleForAngular', 'eChartForAngular', 'compileHtml', 'getProperty', 'peityChange', function(APP_CONFIG, $scope, $stateParams, $http, $timeout, tabeleForAngular, eChartForAngular, compileHtml, getProperty, peityChange){
	
	$scope.sys = $stateParams.sys;
	$scope.app = $stateParams.app;

	var apiUrl = {
		tableEntry: '/api/entry',
		callChart: '/api/callChart',
		sourceChart: '/api/sourceChart'
	};

	//表格存放变量地址
 	var tableSource = null;
	var dataTableSourceObj = {
		"ajax": {
       "url": apiUrl.tableEntry,
       "data": function ( d ) {
           //添加额外的参数传给服务器
           d = $.extend({}, d, $scope.searchObj);
       }
    },
    "aoColumns": [
    	{},
    	{"data": "name"},
    	{"data": "QPS"},
    	{"data": "QPSMax"},
    	{"data": "tp90"},
    	{"data": "tp99"},
    	{"data": "average"},
    	{"data": "rate"},
    	{"data": "zone"}
    ],
    "columnDefs": [
    	{"targets": [0], "render": function(data, type, now){return "";} },
    	{"targets": [8], "render": function(data, type, now){return JSON.stringify(data).slice(1,-1).split(",").join('\n'); }
    	}
    ],
    "fnRowCallback": function(nRow, aData, iDisplayIndex, iDisplayIndexFull ){
    	//此处给每一行添加操作事件
    	$('td:eq(0)', nRow).html(iDisplayIndexFull + 1);
    }
	};
	function initTableSource(sys, app){
		tabeleForAngular.init(tableSource, $('#tableEntry'), dataTableSourceObj, sys, app);
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
		var callChart = null, sourceChart = null;
		var callChartData = {
					title: "调用量监控",
					legend: ["调用量监控"]
				}, 
				sourceChartData = {
						title: "入口占比",
						legend: ["入口占比"]
				};
		initChartBasic("initLine", callChart, "callChart", callChartData, apiUrl.callChart);

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