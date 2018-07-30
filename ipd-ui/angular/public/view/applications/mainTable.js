"use strict";
angular.module('app.applications')
.controller('mainTableController', ['APP_CONFIG', '$scope', '$stateParams', '$http', 'tabeleForAngular', 'compileHtml', function(APP_CONFIG, $scope, $stateParams, $http, tabeleForAngular, compileHtml){
	
	$scope.sys = $stateParams.sys;
	$scope.app = $stateParams.app;

	var apiUrl = {
		tableService: '/api/tableService',
		tableIP: '/api/tableIP'
	};

	//表格存放变量地址
 	var tableService = null, tableIP = null;
 	//app,sys改变时，可调用此方法重新初始化页面数据绑定，以及表格初始化
	function initApplication(sys, app){
		var dataTableServiceObj = {
			"ajax": {
         "url": apiUrl.tableService,
         "data": function ( d ) {
             //添加额外的参数传给服务器
             d = $.extend({}, d, $scope.searchObj);
         }
	    },
	    "aoColumns": [
	    	{},
	    	{"data": "name"}
	    ],
	    "columnDefs": [
	    	{"targets": [0, 2], "render": function(data, type, now){return "";} }
	    ],
	    "fnRowCallback": function(nRow, aData, iDisplayIndex, iDisplayIndexFull ){
	    	//此处给每一行添加操作事件
	    	$('td:eq(0)', nRow).html(iDisplayIndexFull + 1);
	    	var str =  '<a href="#/applications/source" ui-sref="applications.source({sys:sys, app:app, name:' + aData.name + '})">来源分析</a> <a href="#/applications/entry" ui-sref="applications.entry({sys:sys, app:app, name:' + aData.name + '})">入口分析</a>';
	    	var html = compileHtml.getCompiledHtml(str, $scope);
      	$('td:eq(2)', nRow).html(html);
      }
		};
		var dataTableIPObj = {
			"ajax": {
				"url": apiUrl.tableIP,
				"data": function ( d ) {
					//添加额外的参数传给服务器
					d.extra_search = '';
				}
			},
			"aoColumns": [
	    	{},
	    	{"data": "name"},
	    	{"data": "cpu"},
	    	{"data": "memory"},
	    	{"data": "zone"}
	    ],
	    "columnDefs": [
	    	{"targets": [0, 5], "render": function(data, type, now){return "";} }
	    ],
	    "fnRowCallback": function(nRow, aData, iDisplayIndex, iDisplayIndexFull ){
	    	//此处给每一行添加操作事件
	    	$('td:eq(0)', nRow).html(iDisplayIndexFull + 1);
				var str =  '<a href="#/applications/source" ui-sref="applications.source({sys:sys, app:app, name:' + aData.name + '})">环境监控</a> <a href="#/applications/entry" ui-sref="applications.entry({sys:sys, app:app, name:' + aData.name + '})">JVM监控</a>';
	    	var html = compileHtml.getCompiledHtml(str, $scope);
      	$('td:eq(5)', nRow).html(html);
      }
		};

		tabeleForAngular.init(tableService, $('#tableService'), dataTableServiceObj, sys, app);
		tabeleForAngular.init(tableIP, $('#tableIP'), dataTableIPObj, sys, app);
	}

	initApplication($scope.sys, $scope.app);

	$scope.searchObj= {
		serviceName: 'hh'
	};
	$scope.searchGo = function(){
		initApplication($scope.sys, $scope.app);
	}
}]);