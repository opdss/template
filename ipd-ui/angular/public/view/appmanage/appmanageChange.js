"use strict";
angular.module('app.appmanage')
.controller('appmanageChangeController', ['APP_CONFIG', '$scope', '$stateParams', '$http', 'tabeleForAngular', 'compileHtml', function(APP_CONFIG, $scope, $stateParams, $http, tabeleForAngular, compileHtml){
	
	$scope.sys = $stateParams.sys;
	$scope.app = $stateParams.app;


}]);