angular.module('app.appmanage', ['ui.router', 'oc.lazyLoad', 'public'])

//a 1配置假地址为真的地址
.config(function ($stateProvider) {
    $stateProvider
        .state('appmanage', {
            url: '/appmanage',   //a 2angular中假地址对应的url地址栏中显示的地址
            views: {
                "root": { //a 3root是在html中的ui-view对应的地址, ui-view显示的是此模块的html文件
                  controller: 'appmanageController',  //a 4html文件对应的controller名字
                  templateUrl: "view/appmanage/appmanage.html"  //a 5html文件的地址
                }
            },
            resolve: {
                lazy: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['view/appmanage/appmanage.js',
                                'assets/js/plugins/dataTables/jquery.dataTables.js',
                                'assets/css/plugins/dataTables/dataTables.bootstrap.css'
                                ] //a 6controller名字所在的文件以及会用到的插件都在此处
                    });
                }]
            }
        })
        .state('appmanageChange', {
            url: '/appmanageChange',   //a 2angular中假地址对应的url地址栏中显示的地址
            views: {
                "root": { //a 3root是在html中的ui-view对应的地址, ui-view显示的是此模块的html文件
                  controller: 'appmanageChangeController',  //a 4html文件对应的controller名字
                  templateUrl: "view/appmanage/appmanageChange.html"  //a 5html文件的地址
                }
            },
            resolve: {
                lazy: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['view/appmanage/appmanageChange.js'
                                ]
                    });
                }]
            }
        });
});