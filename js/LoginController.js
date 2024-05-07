app.controller('LoginController', function ($scope, $location, AuthService) {


    $scope.credentials = {
        email: '',
        password: ''
    };
    $scope.errorMessage = '';

    $scope.login = function () {

        var button = angular.element(document.getElementById('boton-login'));
        button.prop('disabled', true);
        button.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Iniciando Sesion...');
        AuthService.login($scope.credentials.email, $scope.credentials.password)
            .then(function (response) {

                // Habilitar el botón y volver al estado original
                button.prop('disabled', false);
                button.html('Iniciar sesión');

                let timerInterval;
                Swal.fire({
                    title: "Bienvenido! " + $scope.credentials.email ,
                    position: "top-end",
                    timer: 1500,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading();
                        const timer = Swal.getPopup().querySelector("b");
                        timerInterval = setInterval(() => {
                            timer.textContent = `${Swal.getTimerLeft()}`;
                        }, 100);
                    },
                    willClose: () => {
                        clearInterval(timerInterval);
                    }
                });
                // Verificar token
                var token = AuthService.getToken();
                $location.path('/');
            })
            .catch(function (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Credenciales invalidas!"
                  });
                  
                // Habilitar el botón y volver al estado original
                button.prop('disabled', false);
                button.html('Iniciar sesión');
            });
    };
});
