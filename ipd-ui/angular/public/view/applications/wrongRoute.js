"use strict";
angular.module('app.applications')
.controller('wrongRouteController', ['APP_CONFIG', '$scope', '$stateParams', '$http', 'tabeleForAngular', 'compileHtml', function(APP_CONFIG, $scope, $stateParams, $http, tabeleForAngular, compileHtml){
	
	$scope.sys = $stateParams.sys;
	$scope.app = $stateParams.app;

	var apiUrl = {
		tableWrongRoute: '/api/tableWrongRoute'
	};

	//表格存放变量地址
 	var tableWrongRoute;
 	//app,sys改变时，可调用此方法重新初始化页面数据绑定，以及表格初始化
	function initApplication(sys, app){
		var dataTableWrongRouteObj = {
			"ajax": {
         "url": apiUrl.tableWrongRoute,
         "data": function ( d ) {
             //添加额外的参数传给服务器
             d = $.extend({}, d, $scope.searchObj);
         }
	    },
	    "aoColumns": [
	    	{"data": "layer"},
	    	{"data": "name"},
	    	{"data": "name2"},
	    	{"data": "QPS"},
	    	{"data": "QPSMax"},
	    	{"data": "average"},
	    	{"data": "local"}
	    ],
	    "fnRowCallback": function(nRow, aData, iDisplayIndex, iDisplayIndexFull ){
	    	//此处给每一行添加操作事件
	    	var pre = $('<span>');
	    	var len = (aData.layer - 0) * 10;
	    	pre.css({
	    		"margin-right": len + "px" 
	    	});
      	$('td:eq(1)', nRow).prepend(pre);
      }
		};
		tabeleForAngular.init(tableWrongRoute, $('#tableWrongRoute'), dataTableWrongRouteObj, sys, app);
	}

	initApplication($scope.sys, $scope.app);

	$scope.searchObj= {
		serviceName: 'hh'
	};
	$scope.searchGo = function(){
		initApplication($scope.sys, $scope.app);
	}
}]);