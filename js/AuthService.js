// authservice.js

app.factory('AuthService', function($http, $window) {
    var service = {};
    var baseUrl = 'https://challenge-front-7fw1.onrender.com';
    var tokenKey = 'authToken';

    service.isAuthenticated = function() {
        return !!$window.localStorage.getItem(tokenKey);
    };

    service.login = function(email, password) {
        return $http.post(baseUrl + '/login', { email: email, password: password })
                    .then(function(response) {
                        var token = response.data.token;
                        $window.localStorage.setItem(tokenKey, token);
                        return response.data;
                    });
    };
    
    service.logout = function() {
        // Eliminar el token del almacenamiento local del navegador al cerrar sesión
        $window.localStorage.removeItem(tokenKey);
    };

    service.getToken = function() {
        // Obtener el token del almacenamiento local del navegador
        return $window.localStorage.getItem(tokenKey);
    };



    return service;
});
