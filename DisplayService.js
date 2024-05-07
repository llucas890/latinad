// displayservice.js

app.factory('DisplayService', function($http, AuthService) {
    var service = {};
    var baseUrl = 'https://challenge-front-7fw1.onrender.com';
    console.log(AuthService.getToken());
    service.getDisplays = function(params) {
        var headers = {
            'Authorization': 'Bearer ' + AuthService.getToken(),
            'Content-Type': 'application/json'
        };

        return $http.get(baseUrl + '/display', { headers: headers, params: params });
    };

    // Agrega métodos adicionales para otros endpoints relacionados con las pantallas según sea necesario

    return service;
});
