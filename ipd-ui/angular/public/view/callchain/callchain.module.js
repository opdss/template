angular.module('app.callchain', ['ui.router', 'oc.lazyLoad'])

//a 1配置假地址为真的地址
.config(function ($stateProvider) {
    $stateProvider
        .state('callchain', {
            url: '/callchain',   //a 2angular中假地址对应的url地址栏中显示的地址
            data: {
                title: 'callchain'
            },
            views: {
                "root": { //a 3root是在html中的ui-view对应的地址, ui-view显示的是此模块的html文件
                  controller: 'callchainController',  //a 4html文件对应的controller名字
                  templateUrl: "view/callchain/callchain.html"  //a 5html文件的地址
                }
            },
            resolve: {
                lazy: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['view/callchain/callchain.js'
                                //'/assets/js/plugins/dataTables/jquery.dataTables.js'
                                // '/ipd-ui/js/plugins/dataTables/dataTables.bootstrap.js'
                               ] //a 6controller名字所在的文件以及会用到的插件都在此处
                    });
                }]
            }
        });
});