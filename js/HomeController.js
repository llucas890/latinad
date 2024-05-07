// HomeController.js
app.controller('HomeController', function ($scope, $http, AuthService) {
    $scope.pageSizeOptions = [1, 5, 10, 15]; // Opciones de tamaño de página
    $scope.currentPage = 0; // Página actual
    $scope.pageSize = 100; // Valor predeterminado para pageSize
    $scope.selectedPageSize = 5; // Inicializar selectedPageSize con 5
    $scope.offset = 0; // Valor predeterminado para offset
    $scope.name = ''; // Valor predeterminado para name
    $scope.type = ''; // Valor predeterminado para type
    $scope.displays = [];
    $scope.totalItems = 0; // Total de elementos
    $scope.totalPages = 0; // Total de páginas

    $scope.getDisplays = function () {

        var button = angular.element(document.getElementById('boton-buscar'));
        button.prop('disabled', true);
        button.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Buscando...');


        var params = {
            pageSize: $scope.pageSize,
            offset: $scope.offset
        };

        if ($scope.name !== '') {
            params.name = $scope.name;
        }

        if ($scope.type !== '') {
            params.type = $scope.type;
        }

        var config = {
            headers: {
                'Authorization': 'Bearer ' + AuthService.getToken(),
                'Content-Type': 'application/json'
            },
            params: params
        };
        $http.get('https://challenge-front-7fw1.onrender.com/display', config)
            .then(function (response) {
                console.log(response);
                $scope.displays = response.data.data;
                $scope.totalItems = response.data.totalCount; // Actualizar el total de elementos
                $scope.totalPages = Math.ceil($scope.totalItems / $scope.selectedPageSize); // Calcular el total de páginas
                // Habilitar el botón y volver al estado original
                button.prop('disabled', false);
                button.html('Buscar');
            })
            .catch(function (error) {
                console.error('Error al obtener las pantallas:', error);
            });
    };

    $scope.deleteDisplay = function (id) {

        var button = angular.element(document.getElementById('boton-eliminar-' + id));
        button.prop('disabled', true);
        button.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Eliminando...');
        // Mostrar ventana emergente de confirmación
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción eliminará la pantalla permanentemente.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                var config = {
                    headers: {
                        'Authorization': 'Bearer ' + AuthService.getToken(),
                        'Content-Type': 'application/json'
                    }
                };
                $http.delete('https://challenge-front-7fw1.onrender.com/display/' + id, config)
                    .then(function (response) {
                        // Habilitar el botón y volver al estado original
                        button.prop('disabled', false);
                        button.html('Eliminar');
                        // Actualizar la lista de pantallas después de la eliminación
                        $scope.getDisplays();
                        // Mostrar mensaje de éxito con SweetAlert
                        Swal.fire({
                            icon: 'success',
                            title: 'Éxito',
                            text: 'La pantalla se eliminó correctamente.'
                        });
                    })
                    .catch(function (error) {
                        // Habilitar el botón y volver al estado original
                        button.prop('disabled', false);
                        button.html('Eliminar');
                        // Mostrar mensaje de error con SweetAlert
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Error al eliminar la pantalla.'
                        });
                        console.error('Error al eliminar la pantalla:', error);
                    });
            }
            else {
                // Habilitar el botón y volver al estado original
                button.prop('disabled', false);
                button.html('Eliminar');
            }
        });
    };

    $scope.editDisplay = function (id) {
        $location.path('/editdisplay/' + id);
    };

    $scope.changePageSize = function () {
        $scope.currentPage = 0; // Reiniciar a la primera página al cambiar el tamaño de página
        $scope.totalPages = Math.ceil($scope.totalItems / $scope.selectedPageSize);
        getDisplays();
    };

    $scope.currentPageItems = function () {
        var start = $scope.currentPage * $scope.selectedPageSize;
        return $scope.displays.slice(start, start + $scope.selectedPageSize);
    };



});
