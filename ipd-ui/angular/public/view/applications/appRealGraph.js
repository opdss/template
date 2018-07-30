"use strict";
angular.module('app.applications')
.controller('appRealGraphController', ['APP_CONFIG', '$scope', '$stateParams', '$http', 'tabeleForAngular', '$compile', function(APP_CONFIG, $scope, $stateParams, $http, tabeleForAngular, $compile){
	
	function initAppRelGraph(app){
		var url = "app/findAppRel?appName=" + app;
		$.getJSON(url,function(_d){
			
			var status = _d.status;
			if(status ==200) {
				var data = _d.data;
				// [
				// {"appName":"123","parentAppName":"qwe"},
				// {"appName":"qwe","parentAppName":"asd"}
				// [,...]
				//]
				
				
				
					                    
				
				
			} else if(status ==301) { // 参数异常
				swal({
                    title: "查询参数异常",
                    text: _d.cause,
                    type: "error"
                });
			} else {
				swal({
                    title: "获取应用关系数据失败",
                    text: _d.msg,
                    type: "error"
                });
			}
			
		});
	}
	initAppRelGraph($stateParams.app);
}]);