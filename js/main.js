const title = "Agurus";
const app = window.myApp = angular.module("app-root", ['ngRoute']);
var token = false;
routes = routes.concat(templateRoutes);
let allRoutes = routes.concat(customRoutes);

app.run(function ($rootScope, $location, $rootScope) {
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        // Llamada a la función al cambiar de ruta
        val_login($location, $rootScope, next);
        var requiredRoles = next.$$route && next.$$route.requiredRoles;
       
        if (requiredRoles && !checkUserRole(requiredRoles)) {
            // El usuario no tiene los roles necesarios, redirige a alguna página de error o a otra página
            event.preventDefault();
            $location.path('/unauthorized');
        }

    });
});

app.config(function ($routeProvider) {
    allRoutes.forEach(route => {
        $routeProvider.when(route.path, {
            templateUrl: route.templateUrl,
            controller: route.controller,
            requiresAuth: route.requiresAuth,
            // Puedes agregar más propiedades según sea necesario
        });
    });
    // $routeProvider.when('/:path', {
    //     templateUrl: function (params) {
    //         return './views/' + params.path + '.html';
    //     },
    //     controllerProvider: function (params) {
    //         // Determina el controlador según el parámetro de ruta
    //         return params.path + 'Controller';
    //     },
    //     requiresAuth: true,
    // });
    $routeProvider.otherwise({
        redirectTo: '/login',
    });
});

app.directive('preload', function () {
    return {
        restrict: 'E',
        templateUrl: 'views/template/preload.html', // Crea un archivo preload.html con tu indicador de carga
        link: function (scope, element, attrs) {
            scope.$on('$routeChangeStart', function () {
                scope.showPreload = true;
            });

            scope.$on('$routeChangeSuccess', function () {
                scope.showPreload = false;
            });
        }
    };
});

app.controller("HomeController", function ($scope, $rootScope) {
    // Resto del código para HomeController
    $rootScope.title = `${title} - Home`;
    $rootScope.sidebar = $sidebar;
});

app.controller("iconsController", function ($scope, $rootScope, $location, $http) {
    // Resto del código para HomeController
    $rootScope.title = `${title} - Icons`;
    $rootScope.sidebar = $sidebar;
    $scope.searchText = $rootScope.searchText;
    // $scope.filteredCategories = [];

    // Ruta al archivo categories.yml
    var categoriesUrl = './vendor/fontawesome-free/metadata/categories.yml';

    // Hacer la solicitud HTTP para obtener el contenido del archivo
    $http.get(categoriesUrl).then(function (response) {
        // Almacenar los datos en $scope.categories
        // console.log(response);
        $scope.categories = jsyaml.load(response.data);
    });
    // Función para convertir un objeto en una matriz
    $scope.toArray = function (obj) {
        if (!obj) {
            return [];
        }
        return Object.keys(obj).map(function (key) {
            return obj[key];
        });
    };
    $scope.copyIcon = function (icon) {
        var tempInput = document.createElement('input');
        tempInput.value = `fa-${icon}`;
        document.body.appendChild(tempInput);

        // Seleccionar y copiar el texto
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);

        console.log('Icon copied:', icon);
        alert('Icon copied: ' + icon);
    };
});

app.controller("LoginController", function ($scope, $rootScope, $location, $http) {
    $rootScope.title = `${title} - Login`;
    if (token) {
        $location.path('/home');
    }

    $scope.submitLogin = function () {
        // Aquí puedes realizar la llamada al API con $http
        var credentials = {
            email: $scope.email,
            password: $scope.password
        };
        $http({
            method: 'POST',
            url: 'api/login',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            // data: Object.keys(credentials)
            data: serialize(credentials)
        })
            .then(function (response) {
                // console.log(response);
                // Verificar la respuesta del servidor
                if (response.data.success) {
                    // Guardar el token en localStorage
                    // localStorage.setItem('token', response.data.answer.token);
                    // console.log("Supuesto Token", response.data.answer.token);
                    setCookie("token", response.data.answer.token, 45);
                    localStorage.setItem('userRole', response.data.answer.rol_alias);

                    // Redirigir a la página de inicio
                    $location.path('/home');
                } else {
                    // Manejar el caso de inicio de sesión fallido
                    // console.log('Inicio de sesión fallido');
                }
            })
            .catch(function (response) {
                let errorMessagePrefix = response.data.error.split(':')[0];
                errorHtml = `
                    <div class="alert alert-warning alert-dismissible fade show" role="alert">
                         <strong>${errorMessagePrefix}</strong>:${response.data.error.substring(errorMessagePrefix.length + 1)}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                `;
                $('.showerror').html(errorHtml);
                console.error('Error al iniciar sesión:', response);
            });
    };

    startAnimation();
});

app.controller("RegisterController", function ($scope, $rootScope, $location, $http) {
    $rootScope.title = `${title} - Register`;
    if (token) {
        $location.path('/home');
    }

    $scope.submitRegister = function () {
        // Aquí puedes realizar la llamada al API con $http
        var credentials = {
            username: $scope.email,
            email: $scope.email,
            password: $scope.password
        };
        $http({
            method: 'POST',
            url: 'api/register',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            // data: Object.keys(credentials)
            data: serialize(credentials)
        })
            .then(function (response) {
                // console.log(response);
                // Verificar la respuesta del servidor
                if (response.data.success) {
                    // Guardar el token en localStorage
                    // localStorage.setItem('token', response.data.answer.token);
                    // console.log("Supuesto Token", response.data.answer.token);
                    setCookie("token", response.data.answer.token, 45);
                    localStorage.setItem('userRole', response.data.answer.rol_alias);
                    // Redirigir a la página de inicio
                    $location.path('/home');
                } else {
                    // Manejar el caso de inicio de sesión fallido
                    // console.log('Inicio de sesión fallido');
                }
            })
            .catch(function (response) {
                let errorMessagePrefix = response.data.error.split(':')[0];
                errorHtml = `
                    <div class="alert alert-warning alert-dismissible fade show" role="alert">
                         <strong>${errorMessagePrefix}</strong>:${response.data.error.substring(errorMessagePrefix.length + 1)}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                `;
                $('.showerror').html(errorHtml);
                console.error('Error al iniciar sesión:', response);
            });
    };

    $scope.checkPasswordMatch = function () {
        return ($scope.password) ? $scope.password === $scope.rePassword : false;
    };

    $scope.checkPasswordPattern = function () {
        // Verificar si la contraseña cumple con el patrón
        var passwordPattern = /^(?=.*[!@#$%^&*])(?=.*[a-zA-Z0-9]).{8,}$/;

        // Mensaje de error para la contraseña
        $scope.passwordErrorMessage = "8 characters, at least 1 special character.";

        // Devolver true si la contraseña cumple con el patrón
        return passwordPattern.test($scope.password);
    };

    $scope.transformUsername = function () {
        if ($scope.username) {
            // Reemplazar espacios por -
            $scope.username = $scope.username.replace(/\s+/g, '-');

            // Convertir a minúsculas
            $scope.username = $scope.username.toLowerCase();
        }
    };
    // $(document).on("keyup", "[ng-model='username']", function (event) {
    //     // Asegúrate de que el código de AngularJS se ejecute dentro del ciclo de digest
    //     // $timeout(function () {
    //         $scope.transformUsername();
    //     // });
    // });
    startAnimation();
});

app.controller("LogOutController", function ($scope, $rootScope, $location) {
    $rootScope.title = `${title} - Log Out`;

    // Elimitar TOken de usuario
    token = false;
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');

    // Cierra la modal con el Boton 'btn-LogOutClose'
    $(".btn-LogOutClose").click();

    $location.path('/login');

});

function val_login($location, $rootScope, nextRoute) {
    // Verificar si la ruta requiere autenticación
    var requiresAuth = nextRoute.$$route && nextRoute.$$route.requiresAuth;

    // Verificar si el token está presente en localStorage o cookies
    token = getCookie('token');
    // token = "Token De Prueba";
    // console.log("token", token);

    $rootScope.hasSession = token ? true : false;

    if (requiresAuth && !token) {
        // Redirigir a la página de inicio de sesión si no hay token
        $location.path('/logout');
    }
    if (token) {
        loadScript(localStorage.getItem('userRole'));
    }
}

function checkUserRole(requiredRoles) {
    var userRole = localStorage.getItem('userRole');
    return requiredRoles.includes(userRole);
}

function serialize(datos) {
    return Object.keys(datos).map(function (key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(datos[key]);
    }).join('&')
}

var loadedScripts = {};

function loadScript(alias) {
    if (loadedScripts[alias]) {
        return Promise.resolve();
    }

    const scriptPath = 'js/path/' + alias + '.js';

    return new Promise((resolve, reject) => {
        $.ajax({
            url: scriptPath,
            type: 'HEAD',
            success: () => {
                loadedScripts[alias] = true;
                $("#scripts").append(`<script id="TempScript" src="${scriptPath}"></script>`);
                resolve();
            },
            error: () => reject(new Error('Error al cargar el script ' + alias))
        });
    });
}