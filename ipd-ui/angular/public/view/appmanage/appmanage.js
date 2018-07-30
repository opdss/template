"use strict";
angular.module('app.appmanage')
.controller('appmanageController', ['APP_CONFIG', '$scope', '$stateParams', '$http', 'tabeleForAngular', 'compileHtml', function(APP_CONFIG, $scope, $stateParams, $http, tabeleForAngular, compileHtml){
	
	$scope.sys = $stateParams.sys;
	$scope.app = $stateParams.app;

	var apiUrl = {
		tableAppManage: '/api/tableAppManage'
	};

	//表格存放变量地址
 	var tableAppManage;
 	//app,sys改变时，可调用此方法重新初始化页面数据绑定，以及表格初始化
	function initApplication(sys, app){
		var dataTableAppManageObj = {
			"ajax": {
         "url": apiUrl.tableAppManage,
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
	    	var str =  '<a href="#/applications/appmanageChange" ui-sref="appmanageChange({sys:sys, app:app, name:' + aData.name + '})">修改配置</a>';
	    	var html = compileHtml.getCompiledHtml(str, $scope);
      	$('td:eq(2)', nRow).html(html);
      }
		};
		tabeleForAngular.init(tableAppManage, $('#tableAppManage'), dataTableAppManageObj, sys, app);
	}

	initApplication($scope.sys, $scope.app);

	$scope.searchObj= {
		serviceName: 'hh'
	};
	$scope.searchGo = function(){
		initApplication($scope.sys, $scope.app);
	}
}]);