/**
 * INSPINIA - Responsive Admin Theme
 *
 * Inspinia theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written state for all view in theme.
 *
 */
function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, IdleProvider, KeepaliveProvider) {

    // Configure Idle settings
    IdleProvider.idle(5); // in seconds
    IdleProvider.timeout(3600); // in seconds

    $urlRouterProvider.otherwise("/tool/pro1");
    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false
    });

    $stateProvider
    .state('login', {
        url: "/login",
        templateUrl: "views/login.html",
        data: { pageTitle: 'Login', specialClass: 'gray-bg', access: {isFree: true}},
        resolve: {
            loadPlugin: function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    {
                        name: 'piApp',
                        files:[
                            'js/services/system/userServices.js',
                            'js/controllers/loginCtrl.js']
                    }
                ]);
            }
        }
    })
    .state('tool', {
        abstract: true,
        url: "/tool",
        templateUrl: "demo/views/common/content.html"
    })
    .state('tool.pro1', {
        url: "/pro1",
        templateUrl: "demo/views/pages/pro1.html",
        data: { pageTitle: '1', access: {isFree: false}},
        resolve: {
            loadPlugin: function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    {
                        serie: true,
                        name: 'angular-flot',
                        files: [
                            'resources/js/plugins/flot/jquery.flot.js',
                            'resources/js/plugins/flot/jquery.flot.time.js',
                            'resources/js/plugins/flot/jquery.flot.tooltip.min.js',
                            'resources/js/plugins/flot/jquery.flot.spline.js',
                            'resources/js/plugins/flot/jquery.flot.resize.js',
                            'resources/js/plugins/flot/jquery.flot.pie.js',
                            'resources/js/plugins/flot/curvedLines.js',
                            'resources/js/plugins/flot/angular-flot.js'
                        ]
                    },
                    {
                        serie: true,
                        files: [
                            'resources/js/plugins/jvectormap/jquery-jvectormap-2.0.2.min.js',
                            'resources/js/plugins/jvectormap/jquery-jvectormap-2.0.2.css'
                        ]
                    },
                    {
                        serie: true,
                        files: [
                            'resources/js/plugins/jvectormap/jquery-jvectormap-world-mill-en.js',
                            'resources/js/plugins/jvectormap/jquery-jvectormap-cn-mill.js'
                        ]
                    },
                    {
                        name: 'ui.checkbox',
                        files: ['resources/js/bootstrap/angular-bootstrap-checkbox.js']
                    },
                    {
                        name: 'piApp',
                        files:['demo/js/controllers/proCtrl.js']
                    }
                ]);
            }
        }

    })

    .state('tool.pro2', {
        url: "/pro2",
        templateUrl: "demo/views/pages/pro2.html",
        data: { pageTitle: '2', access: {isFree: false}},
        resolve: {
            loadPlugin: function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    {
                        serie: true,
                        name: 'angular-flot',
                        files: [
                            'resources/js/plugins/flot/jquery.flot.js',
                            'resources/js/plugins/flot/jquery.flot.time.js',
                            'resources/js/plugins/flot/jquery.flot.tooltip.min.js',
                            'resources/js/plugins/flot/jquery.flot.spline.js',
                            'resources/js/plugins/flot/jquery.flot.resize.js',
                            'resources/js/plugins/flot/jquery.flot.pie.js',
                            'resources/js/plugins/flot/curvedLines.js',
                            'resources/js/plugins/flot/angular-flot.js'
                        ]
                    },
                    {
                        serie: true,
                        files: [
                            'resources/js/plugins/jvectormap/jquery-jvectormap-2.0.2.min.js',
                            'resources/js/plugins/jvectormap/jquery-jvectormap-2.0.2.css'
                        ]
                    },
                    {
                        serie: true,
                        files: [
                            'resources/js/plugins/jvectormap/jquery-jvectormap-world-mill-en.js',
                            'resources/js/plugins/jvectormap/jquery-jvectormap-cn-mill.js'
                        ]
                    },
                    {
                        name: 'ui.checkbox',
                        files: ['resources/js/bootstrap/angular-bootstrap-checkbox.js']
                    },
                    {
                        name: 'piApp',
                        files:['demo/js/controllers/proCtrl.js']
                    }
                ]);
            }
        }

    })

    .state('tool.pro3', {
        url: "/pro3",
        templateUrl: "demo/views/pages/pro3.html",
        data: { pageTitle: '2', access: {isFree: false}},
        resolve: {
            loadPlugin: function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    {
                        serie: true,
                        name: 'angular-flot',
                        files: [
                            'resources/js/plugins/flot/jquery.flot.js',
                            'resources/js/plugins/flot/jquery.flot.time.js',
                            'resources/js/plugins/flot/jquery.flot.tooltip.min.js',
                            'resources/js/plugins/flot/jquery.flot.spline.js',
                            'resources/js/plugins/flot/jquery.flot.resize.js',
                            'resources/js/plugins/flot/jquery.flot.pie.js',
                            'resources/js/plugins/flot/curvedLines.js',
                            'resources/js/plugins/flot/angular-flot.js'
                        ]
                    },
                    {
                        serie: true,
                        files: [
                            'resources/js/plugins/jvectormap/jquery-jvectormap-2.0.2.min.js',
                            'resources/js/plugins/jvectormap/jquery-jvectormap-2.0.2.css'
                        ]
                    },
                    {
                        serie: true,
                        files: [
                            'resources/js/plugins/jvectormap/jquery-jvectormap-world-mill-en.js',
                            'resources/js/plugins/jvectormap/jquery-jvectormap-cn-mill.js'
                        ]
                    },
                    {
                        name: 'ui.checkbox',
                        files: ['resources/js/bootstrap/angular-bootstrap-checkbox.js']
                    },
                    {
                        name: 'piApp',
                        files:['demo/js/controllers/proCtrl.js']
                    }
                ]);
            }
        }

    })

    .state('tool.internal1', {
        url: "/internal1",
        templateUrl: "demo/views/pages/internal1.html",
        data: { pageTitle: '内部1', access: {isFree: false}},
        resolve: {
            loadPlugin: function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    {
                        serie: true,
                        name: 'angular-flot',
                        files: [
                            'resources/js/plugins/flot/jquery.flot.js',
                            'resources/js/plugins/flot/jquery.flot.time.js',
                            'resources/js/plugins/flot/jquery.flot.tooltip.min.js',
                            'resources/js/plugins/flot/jquery.flot.spline.js',
                            'resources/js/plugins/flot/jquery.flot.resize.js',
                            'resources/js/plugins/flot/jquery.flot.pie.js',
                            'resources/js/plugins/flot/curvedLines.js',
                            'resources/js/plugins/flot/angular-flot.js'
                        ]
                    },
                    {
                        files: [
                            'resources/js/plugins/sparkline/jquery.sparkline.min.js'
                        ]
                    },
                    {
                        name: 'piApp',
                        files:['demo/js/controllers/internalCtrl.js']
                    }
                ]);
            }
        }
    })

    .state('tool.internal2', {
        url: "/internal2",
        templateUrl: "demo/views/pages/internal2.html",
        data: { pageTitle: '内部2', access: {isFree: false}},
        resolve: {
            loadPlugin: function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    {
                        files: ['resources/js/plugins/pdfjs/pdf.js']
                    },
                    {
                        name: 'pdf',
                        files: ['resources/js/plugins/pdfjs/angular-pdf.js']
                    },
                    {
                        name: 'piApp',
                        files:['demo/js/controllers/internalCtrl.js']
                    }
                ]);
            }
        }
    })

    ;

}

function stateChangeListener($rootScope, Idle, $location, authService){
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        //check user authorization, redirect to login page if not authorized
        if(!toState.data.access.isFree && (authService.getAuthorizedUser() == undefined || authService.getAuthorizedUser() == "")) {
            $location.path("/login");
        }
    });

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        if(toState.url != "/login"){
            Idle.watch();
            $rootScope.$on('IdleTimeout', function () {
                authService.userInvalid();
                $rootScope.$apply(function() {
                    $location.path("/login");
                });
            });
        }
    });
}

angular
    .module('piApp')
    .config(config)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    })
    .run(function(editableOptions) {
        editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
    })
    //.run(stateChangeListener);
