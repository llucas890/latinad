var app = angular.module('myApp', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/login/', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'HomeController',
            // Función de autorización para restringir el acceso al home.html
            resolve: {
                auth: function ($location, AuthService) {
                    if (!AuthService.isAuthenticated()) {
                        $location.path('/login');
                    }
                }
            }
        })
        .when('/home2', {
            templateUrl: 'views/home2.html',
            controller: 'HomeController',
            // Función de autorización para restringir el acceso al home.html
            resolve: {
                auth: function ($location, AuthService) {
                    if (!AuthService.isAuthenticated()) {
                        $location.path('/login');
                    }
                }
            }
        })
        .when('/newdisplay/', {
            templateUrl: 'views/newdisplay.html',
            controller: 'NewDisplayController',
            // Función de autorización para restringir el acceso al home.html
            resolve: {
                auth: function ($location, AuthService) {
                    if (!AuthService.isAuthenticated()) {
                        $location.path('/login');
                    }
                }
            }
        })
        .when('/editdisplay/:id', {
            templateUrl: 'views/editdisplay.html',
            controller: 'EditDisplayController',
            // Función de autorización para restringir el acceso al home.html
            resolve: {
                auth: function ($location, AuthService) {
                    if (!AuthService.isAuthenticated()) {
                        $location.path('/login');
                    }
                }
            }
        })
        .otherwise({ redirectTo: '/login' });
});
