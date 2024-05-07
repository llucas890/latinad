app.controller('NavbarController', function ($scope, $window, $location, AuthService) {
    // Verificar si el usuario está autenticado al cargar la página
    $scope.isAuthenticated = AuthService.isAuthenticated;
    $scope.showNavbar = true; // Por defecto, mostrar la barra de navegación

    // Función para cerrar sesión
    $scope.logout = function () {
        Swal.fire({
            title: "¿Estas seguro de cerrar sesión?",
            showCancelButton: true,
            confirmButtonText: "Si",
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {

                AuthService.logout();
                $window.location.reload();

                // Actualizar el estado de autenticación
                $scope.isAuthenticated = false;
            }
        });
    };
});
