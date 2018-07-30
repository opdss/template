"use strict";
angular.module('app.applications')
.controller('applicationsController', ['APP_CONFIG', '$scope', '$http', '$state', function(APP_CONFIG, $scope, $http,$state){
	$http.get(APP_CONFIG.menuListUrl).then(function(data){
		data = data.data;
		$scope.apps = data;
		$state.go('applications.appRealGraph', {app: app});
	})
	$state.go('applications.mainTable', {app: 'app', sys: 'sys'});
}]);
