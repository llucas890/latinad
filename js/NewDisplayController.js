// NewDisplayController.js

app.controller('NewDisplayController', function ($scope, $http, AuthService) {
    $scope.newDisplay = {
        name: '',
        description: '',
        price_per_day: 0,
        resolution_height: 0,
        resolution_width: 0,
        type: ''
    };

    $scope.createDisplay = function () {

        var button = angular.element(document.getElementById('crear-pantalla'));
        button.prop('disabled', true);
        button.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Creando pantalla...');

        var config = {
            headers: {
                'Authorization': 'Bearer ' + AuthService.getToken(),
                'Content-Type': 'application/json'
            }
        };
        $http.post('https://challenge-front-7fw1.onrender.com/display', $scope.newDisplay, config)
            .then(function (response) {
                // Verificar si la respuesta indica que el registro se agregó correctamente
                if (response.status === 200) {

                    // Habilitar el botón y volver al estado original
                    button.prop('disabled', false);
                    button.html('Crear pantalla');
                    // Restablecer los valores de los campos del formulario
                    $scope.newDisplay = {
                        name: '',
                        description: '',
                        price_per_day: 0,
                        resolution_height: 0,
                        resolution_width: 0,
                        type: ''
                    };
                    // Mostrar mensaje de éxito con SweetAlert, incluyendo la descripción
                    Swal.fire({
                        icon: 'success',
                        title: 'Éxito',
                        text: 'El registro se agregó correctamente'
                    });
                } else {

                    // Habilitar el botón y volver al estado original
                    button.prop('disabled', false);
                    button.html('Buscar');
                    // Mostrar mensaje de error con SweetAlert
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Error al agregar el registro.'
                    });
                }
            })
            .catch(function (error) {

                // Habilitar el botón y volver al estado original
                button.prop('disabled', false);
                button.html('Buscar');
                // Mostrar mensaje de error con SweetAlert
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al agregar el registro.'
                });
                console.error('Error al agregar el registro:', error);
            });
    };
});
