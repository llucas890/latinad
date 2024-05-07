app.controller('EditDisplayController', function($scope, $http, $routeParams, AuthService) {
    $scope.display = {};

    $scope.getDisplay = function() {
        var displayId = $routeParams.id; // Obtener el ID del display de los parámetros de ruta
        var config = {
            headers: {
                'Authorization': 'Bearer ' + AuthService.getToken(),
                'Content-Type': 'application/json'
            }
        };
        $http.get('https://challenge-front-7fw1.onrender.com/display/' + displayId, config)
            .then(function(response) {
                $scope.display = response.data;
            })
            .catch(function(error) {
                console.error('Error al obtener los datos del display:', error);
            });
    };

    // Llamar a la función para obtener los datos del display cuando se carga el controlador
    $scope.getDisplay();

    // Función para actualizar los datos del display
    $scope.updateDisplay = function() {
        var displayId = $routeParams.id; // Obtener el ID del display de los parámetros de ruta
        var config = {
            headers: {
                'Authorization': 'Bearer ' + AuthService.getToken(),
                'Content-Type': 'application/json'
            }
        };
        $http.put('https://challenge-front-7fw1.onrender.com/display/' + displayId, $scope.display, config)
            .then(function(response) {
                // Mostrar mensaje de éxito con SweetAlert
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Los datos del display se actualizaron correctamente.'
                });
            })
            .catch(function(error) {
                // Mostrar mensaje de error con SweetAlert
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al actualizar los datos del display.'
                });
                console.error('Error al actualizar los datos del display:', error);
            });
    };
});
