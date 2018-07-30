/*
 * 验证是否登录，获得user信息，处理登录登出
 */
 angular.module('app.auth', ['ui.router', 'ngCookies'])
 /*登录验证和信息服务*/
 .factory('authService', ['$rootScope', '$cookies', '$http', 'APP_CONFIG', function($rootScope, $cookies, $http, APP_CONFIG){
    var authService = {
        userErp: null,
        userInfo: null,
        /* 获取用户登录与否的信息
           http://test.ssa.jd.com/sso/ticket/verifyTicket,
           ticket从cookie中读取的sso.jd.com值, url当前用户访问应用URL地址, ip当前用户的IP,
           请求接口可以直接带上吗 
           以上为服务端接口
         */
        //需要自己的服务端验证 change authService user and return boolean
        isLogin: function(){
            //返回promise可进行链式操作，等有结果后验证是否登录
            return $http.get(APP_CONFIG.authUrl).then(function(data){
                var _d = data.data;
                if(!_d.login){
                    authService.userErp = null;
                }
                authService.userInfo = _d.data;
                authService.userErp = _d.data.pin;
            });
        },
        //从ssa.jd.com登录
        logIn: function(){
            location.href = "http://test.ssa.jd.com/sso/login?returnUrl=" + APP_CONFIG.url;
        },
        //认为是清除 页面用户信息 和 cookie信息
        logOut: function(){
            authService.user = null;
            $cookies.remove("sso.jd.com");
            location.href = "http://test.ssa.jd.com/sso/login?returnUrl=" + APP_CONFIG.url;
        },
        isAuthenticated: function(user, state){
            // return $http.get().then(function(data){
            //     return data.data;
            // });
        },
        changeUser: function (){
        	swal({
      		  title: "请输入要切换的ERP:",
      		  text: "查看指定ERP的应用信息",
      		  type: "input",
      		  showCancelButton: true,
      		  closeOnConfirm: false,
      		  animation: "slide-from-top",
      		  inputPlaceholder: "place input erp"
      		},
      		function(erp){
    				if (erp === false) return false;
    				if (erp === "") {
    					swal.showInputError("请输入ERP");
    					return false;
    				}
            $http.get(APP_CONFIG.changeUser + '?erp=' + erp).then(function(data){
              data = data.data;
              if(data.status == 200){
                swal("Nice!", "切换ERP操作成功: " + erp, "success");
                authService.loadUserInfo(true);
              } else {
                swal("Bad!", "切换ERP操作失败：" + erp, "error");
              }
            });
          });
        },
        loadUserInfo: function (bool){
        	$http.get(APP_CONFIG.getLoginInfo).then(function(data){
              data = data.data;
              if(data.status == 200){
                authService.userInfo = data.data;
                if(bool){
                  $rootScope.$broadcast('userInfoChanged');
                }
              } else {
                swal({
                   title: "获取用户数据失败",
                   text: data.msg,
                   type: "error"
                });
              }
            });
        },
        currentUser: function (){
        	swal({
             title: "当前用户",
             text: "登录ERP：" + authService.userErp + "，系统查询ERP：" + authService.userInfo.use_erp,
             type: "info"
          });
        }
    };
    return authService;
 }])
 /*登录页面信息*/
 .directive('loginInfo', ['authService', function(authService){
    return {
        restrict: 'A',
        templateUrl: 'view/auth/loginInfo.html',
        link: function(scope, element){
            scope.userErp = authService.userErp;
            scope.userInfo = authService.userInfo;
            scope.changeUser = function() {
            	authService.changeUser();
            };
            scope.currentUser = function() {
            	authService.currentUser();
            };
            scope.logOut = function(){
              authService.logOut();
            };
        }
    }
 }])
 //无权限访问页面地址
 .controller('notAuthenticatedCtrl', [function(){

 }])
 .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('notAuthenticated', {
            url: '/not-authenticated',
            views: {
                "root": {
                    templateUrl: "view/auth/notAuthenticated.html",
                    controller: 'notAuthenticatedCtrl'
                }
            }
        });
}]);