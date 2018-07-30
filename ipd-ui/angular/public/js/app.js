/*
 * author: wangwenjing
 */

$(function () {
    angular.bootstrap(document, ['app']);
});

window.appConfig = {
  "menuListUrl": "/api/menuList",
};

angular.module('app', ['public', 'app.auth', 'ui.router', 'app.applications', 'app.callchain', 'app.callchaindetail', 'app.appmanage']);

angular.module('app')
.constant('APP_CONFIG', window.appConfig)
.run(['APP_CONFIG', 'authService', '$rootScope', '$state', function(APP_CONFIG, authService, $rootScope, $state){

	 // authService.isLogin().then(function(){
	 // 	if(!authService.userErp){
	 // 		location.href = "http://ssa.jd.com/sso/login?returnUrl=" + APP_CONFIG.url;
	 // 	}
	 // });
	
	// authService.loadUserInfo();
	
	//不拦截每个请求，只在服务器请求返回用户无权限的时候跳转到无授权页面
	// $state.go('notAuthenticated');

	//此方案为拦截请求，获取一次用户权限内容
	// $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
		// event.preventDefault();
		// alert(event);
		// if(toState.name == 'auth.notAuthenticated')return;
		// $rootScope.toState = toState;
  	// $rootScope.toStateParams = toStateParams;
    // if(!(authService.isAuthenticated(authService.user, toState))){
    //     event.preventDefault();
    //     $state.go("auth.notAuthenticated");
    //     return;
    // }
	// });

}]);