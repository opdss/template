"use strict";
angular.module('app.applications')
.controller('wrongDetailController', ['APP_CONFIG', '$scope', '$stateParams', '$http', 'tabeleForAngular', 'compileHtml', function(APP_CONFIG, $scope, $stateParams, $http, tabeleForAngular, compileHtml){
	
	$scope.sys = $stateParams.sys;
	$scope.app = $stateParams.app;

	var apiUrl = {
		tableWrongDetail: '/api/tableWrongDetail'
	};

	//表格存放变量地址
 	var tableWrongDetail;
 	//app,sys改变时，可调用此方法重新初始化页面数据绑定，以及表格初始化
	function initApplication(sys, app){
		var dataTableWrongDetailObj = {
			"ajax": {
         "url": apiUrl.tableWrongDetail,
         "data": function ( d ) {
             //添加额外的参数传给服务器
             d = $.extend({}, d, $scope.searchObj);
         }
	    },
	    "aoColumns": [
	    	{},
	    	{"data": "name"},
	    	{"data": "source"}
	    ],
	    "columnDefs": [
	    	{"targets": [0, 3], "render": function(data, type, now){return "";} }
	    ],
	    "fnRowCallback": function(nRow, aData, iDisplayIndex, iDisplayIndexFull ){
	    	//此处给每一行添加操作事件
	    	$('td:eq(0)', nRow).html(iDisplayIndexFull + 1);
	    	var str =  '<a href="#/applications/wrongRoute" ui-sref="applications.wrongRoute({sys:sys, app:app, name:' + aData.name + '})">查看错误</a>';
	    	var html = compileHtml.getCompiledHtml(str, $scope);
      	$('td:eq(3)', nRow).html(html);
      }
		};
		tabeleForAngular.init(tableWrongDetail, $('#tableWrongDetail'), dataTableWrongDetailObj, sys, app);
	}

	initApplication($scope.sys, $scope.app);

	$scope.searchObj= {
		serviceName: 'hh'
	};
	$scope.searchGo = function(){
		initApplication($scope.sys, $scope.app);
	}
}]);