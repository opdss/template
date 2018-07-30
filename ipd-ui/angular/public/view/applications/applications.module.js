angular.module('app.applications', ['ui.router', 'oc.lazyLoad', 'public'])

//a 1配置假地址为真的地址
.config(function ($stateProvider) {
    $stateProvider
        .state('applications', {
            url: '/applications',   //a 2angular中假地址对应的url地址栏中显示的地址
            views: {
                "root": { //a 3root是在html中的ui-view对应的地址, ui-view显示的是此模块的html文件
                  controller: 'applicationsController',  //a 4html文件对应的controller名字
                  templateUrl: "view/applications/applications.html"  //a 5html文件的地址
                }
            },
            resolve: {
                lazy: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['view/applications/applications.js',
                                'assets/js/plugins/dataTables/jquery.dataTables.js',
                                'assets/css/plugins/dataTables/dataTables.bootstrap.css'
                                ] //a 6controller名字所在的文件以及会用到的插件都在此处
                    });
                }]
            }
        })
        .state('applications.appRealGraph',{
        	params: {
                app: null
                
            },
            url: '/appRealGraph',  
            views: {
                "main": {
                  controller: 'appRealGraphController',
                  templateUrl: "view/applications/appRealGraph.html"
                }  
            },
            resolve: {
                lazy: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['view/applications/appRealGraph.js',
                                'assets/js/plugins/echarts/echarts.min.js'
                                ]
                    });
                }]
            }
        })
        .state('applications.mainTable', {
            params: {
                sys: null,
                app: null
            },
            url: '/mainTable',  
            views: {
                "main": {
                  controller: 'mainTableController',
                  templateUrl: "view/applications/mainTable.html"
                }  
            },
            resolve: {
                lazy: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['view/applications/mainTable.js',
                                'assets/js/plugins/datapicker/bootstrap-datetimepicker.js',
                                'assets/css/plugins/datapicker/bootstrap-datetimepicker.css'
                               ]
                    });
                }]
            }
        })
        .state('applications.source', {
            params: {
                sys: null,
                app: null
            },
            url: '/source',  
            views: {
                "main": {
                  controller: 'sourceController',
                  templateUrl: "view/applications/source.html"
                }  
            },
            resolve: {
                lazy: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['view/applications/source.js',
                                'assets/js/plugins/datapicker/bootstrap-datetimepicker.js',
                                'assets/css/plugins/datapicker/bootstrap-datetimepicker.css',
                                'assets/js/plugins/peity/jquery.peity.min.js',
                                'assets/js/plugins/echarts/echarts.min.js'
                                ]
                    });
                }]
            }
        })
        .state('applications.entry', {
            params: {
                sys: null,
                app: null
            },
            url: '/entry',  
            views: {
                "main": {
                  controller: 'entryController',
                  templateUrl: "view/applications/entry.html"
                }  
            },
            resolve: {
                lazy: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['view/applications/entry.js',
                                'assets/js/plugins/datapicker/bootstrap-datetimepicker.js',
                                'assets/css/plugins/datapicker/bootstrap-datetimepicker.css',
                                'assets/js/plugins/echarts/echarts.min.js'
                                ]
                    });
                }]
            }
        })
        .state('applications.wrong', {
            params: {
                sys: null,
                app: null
            },
            url: '/wrong',  
            views: {
                "main": {
                  controller: 'wrongController',
                  templateUrl: "view/applications/wrong.html"
                }  
            },
            resolve: {
                lazy: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['view/applications/wrong.js',
                                'assets/js/plugins/datapicker/bootstrap-datetimepicker.js',
                                'assets/css/plugins/datapicker/bootstrap-datetimepicker.css'
                                ]
                    });
                }]
            }
        })
        .state('applications.wrongDetail', {
            params: {
                sys: null,
                app: null
            },
            url: '/wrongDetail',  
            views: {
                "main": {
                  controller: 'wrongDetailController',
                  templateUrl: "view/applications/wrongDetail.html"
                }  
            },
            resolve: {
                lazy: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['view/applications/wrongDetail.js',
                                'assets/js/plugins/datapicker/bootstrap-datetimepicker.js',
                                'assets/css/plugins/datapicker/bootstrap-datetimepicker.css'
                                ]
                    });
                }]
            }
        })
        .state('applications.wrongRoute', {
            params: {
                sys: null,
                app: null
            },
            url: '/wrongRoute',  
            views: {
                "main": {
                  controller: 'wrongRouteController',
                  templateUrl: "view/applications/wrongRoute.html"
                }  
            },
            resolve: {
                lazy: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['view/applications/wrongRoute.js',
                                'assets/js/plugins/datapicker/bootstrap-datetimepicker.js',
                                'assets/css/plugins/datapicker/bootstrap-datetimepicker.css'
                                ]
                    });
                }]
            }
        });
});