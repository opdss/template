1 npm install
2 node index
3 127.0.0.1:3000

1 $state的参数传递三步
    a 在路由的目标页面定义接受的参数
        .state('applications.mainTable', {
                params: {
                    sys: null,
                    app: null
                },
                url: '/applications/mainTable', 
                。。。
        })
    b 传参
        $state.go('applications.mainTable', {sys: data.sys, app: data.app});
        ui-sref="applications.mainTable({sys:sys,app:app})"
    c 接收参数
        .controller('mainTableController', function($scope, $stateParams){
           console.log($stateParams.sys);
        })



1 验证用户是否登录(需要后端提供服务)
    后续可用node实现web服务？由node处理登录验证？

2 当新的页面返回数据时，如果此用户没有权限，有标识

