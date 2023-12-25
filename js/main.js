const title = "Agurus";

const app = angular.module("app-root", ['ngRoute']);
var token = false;

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
    $routeProvider
        .when('/login', {
            templateUrl: './views/login.html',
            controller: 'LoginController'
        })
        .when('/logout', {
            templateUrl: './views/login.html',
            controller: 'LogOutController',
            requiresAuth: true
        })
        .when('/register', {
            templateUrl: './views/register.html',
            controller: 'RegisterController'
        })
        .when('/forgot-password', {
            templateUrl: './views/forgot-password.html',
            controller: 'LoginController'
        })
        .when('/home', {
            templateUrl: './views/home.html',
            controller: 'HomeController',
            requiresAuth: true
        })
        .when('/profile', {
            templateUrl: './views/profile.html',
            controller: 'HomeController',
            requiresAuth: true
        })
        .when('/buttons', {
            templateUrl: './views/buttons.html',
            controller: 'HomeController',
            requiresAuth: true
        })
        .when('/icons', {
            templateUrl: './views/icons.html',
            controller: 'iconsController',
            requiresAuth: true
        })
        .when('/cards', {
            templateUrl: './views/cards.html',
            controller: 'HomeController',
            requiresAuth: true
        })
        .when('/charts', {
            templateUrl: './views/charts.html',
            controller: 'HomeController',
            requiresAuth: true
        })
        .when('/tables', {
            templateUrl: './views/tables.html',
            controller: 'HomeController',
            requiresAuth: true
        })
        .when('/delegacion', {
            templateUrl: './views/delegacion.html',
            controller: 'HomeController',
            requiresAuth: true,
            requiredRoles: ['admin']
        })
        .when('/utilities-animation', {
            templateUrl: './views/utilities-animation.html',
            controller: 'HomeController',
            requiresAuth: true
        })
        .when('/utilities-border', {
            templateUrl: './views/utilities-border.html',
            controller: 'HomeController',
            requiresAuth: true
        })
        .when('/utilities-color', {
            templateUrl: './views/utilities-color.html',
            controller: 'HomeController',
            requiresAuth: true
        })
        .when('/utilities-other', {
            templateUrl: './views/utilities-other.html',
            controller: 'HomeController',
            requiresAuth: true
        })
        .when('/404', {
            templateUrl: './views/template/404.html',
            controller: 'HomeController',
        })
        .when('/blank', {
            templateUrl: './views/template/blank.html',
            controller: 'HomeController',
        })
        .otherwise({
            redirectTo: '/home'
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

app.controller("SidebarController", function ($scope, $http) {
    // Obtener dinámicamente las rutas desde el API
    $http.get('api/rutas')
        .then(function (response) {
            // Asignar las rutas al $scope para usarlas en la vista
            $scope.menuItems = response.data;
        })
        .catch(function (error) {
            console.error('Error al obtener las rutas:', error);
        });
});

app.controller("app-controller", function ($scope, $rootScope) {
    $rootScope.title = `${title} - Home`;
});

app.controller("HomeController", function ($scope, $rootScope) {
    // Resto del código para HomeController
    $rootScope.title = `${title} - Home`;
});

app.controller("iconsController", function ($scope, $rootScope, $location, $http) {
    // Resto del código para HomeController
    $rootScope.title = `${title} - Icons`;

    // Ruta al archivo categories.yml
    var categoriesUrl = './vendor/fontawesome-free/metadata/categories.yml';

    // Hacer la solicitud HTTP para obtener el contenido del archivo
    $http.get(categoriesUrl).then(function (response) {
        // Almacenar los datos en $scope.categories
        console.log(response);
        $scope.categories = jsyaml.load(response.data);
    });

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
                console.log(response);
                // Verificar la respuesta del servidor
                if (response.data.success) {
                    // Guardar el token en localStorage
                    // localStorage.setItem('token', response.data.answer.token);
                    console.log("Supuesto Token", response.data.answer.token);
                    setCookie("token", response.data.answer.token, 45);
                    localStorage.setItem('userRole', response.data.answer.rol_alias);

                    // Redirigir a la página de inicio
                    $location.path('/home');
                } else {
                    // Manejar el caso de inicio de sesión fallido
                    console.log('Inicio de sesión fallido');
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
                console.log(response);
                // Verificar la respuesta del servidor
                if (response.data.success) {
                    // Guardar el token en localStorage
                    // localStorage.setItem('token', response.data.answer.token);
                    console.log("Supuesto Token", response.data.answer.token);
                    setCookie("token", response.data.answer.token, 45);
                    localStorage.setItem('userRole', response.data.answer.rol_alias);
                    // Redirigir a la página de inicio
                    $location.path('/home');
                } else {
                    // Manejar el caso de inicio de sesión fallido
                    console.log('Inicio de sesión fallido');
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
    console.log("token", token);

    $rootScope.hasSession = token ? true : false;

    if (requiresAuth && !token) {
        // Redirigir a la página de inicio de sesión si no hay token
        $location.path('/logout');
    }
    loadScript(localStorage.getItem('userRole'));
}

function checkUserRole(requiredRoles) {
    var userRole = localStorage.getItem('userRole');
    return requiredRoles.includes(userRole);
}

// Función para Obtener el valor una cookie
// function getCookie(name) {
//     var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
//     return match ? match[2] : null;
// }
function getCookie(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));

    if (match) {
        // Obtener el valor de la cookie
        var cookieValue = match[2];

        // Comprobar si la cookie tiene fecha de caducidad
        if (match[1].indexOf(';') === 0) {
            // Obtener la fecha de caducidad de la cookie
            var expirationDate = new Date(match[1].slice(1));

            // Comprobar si la cookie ha caducado
            var currentDate = new Date();

            if (expirationDate > currentDate) {
                // La cookie no ha caducado, devolver el valor
                return cookieValue;
            } else {
                // La cookie ha caducado, eliminarla
                document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                return null;
            }
        } else {
            // La cookie no tiene fecha de caducidad, devolver el valor
            return cookieValue;
        }
    } else {
        // No se encontró la cookie
        return null;
    }
}

// Función para Crear una cookie
function setCookie(name, value, minutes) {
    var expires = "";
    if (minutes) {
        var date = new Date();
        date.setTime(date.getTime() + (minutes * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function startAnimation() {
    anime({
        targets: '#anime div',
        translateX: function () { return anime.random(10, 14) + 'rem'; },
        scale: function () { return anime.random(10, 20) / 10; },
        rotate: function () { return anime.random(-360, 360); },
        duration: function () { return anime.random(1000, 2000); },
        direction: 'alternate',
        loop: true
    });
}

function serialize(datos) {
    return Object.keys(datos).map(function (key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(datos[key]);
    }).join('&')
}

function loadScript(alias) {
    var scriptPath = $base_url + 'js/security/' + alias + '.js';
    $script([scriptPath], function () {
        // El script se ha cargado, puedes realizar acciones adicionales aquí si es necesario
        // Por ejemplo, configurar rutas y controladores específicos del rol.
        // RoleService.configureRoutes(userRoleAlias);
    });
}