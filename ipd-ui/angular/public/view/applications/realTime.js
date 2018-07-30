"use strict";
angular.module('app.applications')
.controller('realTimeController', ['APP_CONFIG', '$scope', '$stateParams', '$http', 'tabeleForAngular', function(APP_CONFIG, $scope, $stateParams, $http, tabeleForAngular){
		$scope.sys = $stateParams.sys;
		$scope.app = $stateParams.app;
		$scope.name = $stateParams.name;
		$scope.text = "i am real time html ";

}]);