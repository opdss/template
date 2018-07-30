"use strict";
angular.module('app.callchain')
.controller('callchainController', ['$scope', '$http', function($scope, $http){
	$scope.init = function(){
		alert("我是调用链");
	};
	$scope.init();
}]);