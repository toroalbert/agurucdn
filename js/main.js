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
            controller: 'LoginController'
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

app.controller("LoginController", function ($scope, $rootScope, $location, $http) {
    $rootScope.title = `${title} - Login`;
    if (token) {
        $location.path('/home');
    }

    $scope.submitLogin = function () {
        // Aquí puedes realizar la llamada al API con $http
        var credentials = {
            username: $scope.username,
            password: $scope.password
        };
        localStorage.setItem('token', "Token de Prueba");
        setCookie("token", "Token de Prueba", 1);
        localStorage.setItem('userRole', "admin");
        $location.path('/home');
        // $http.post('localhost/api/login', credentials, {
        //     headers: {
        //         'Content-Type': 'application/json',
        //     }
        // })
        //     .then(function (response) {
        //         console.log(response);
        //         // Verificar la respuesta del servidor
        //         if (response.data.success) {
        //             // Guardar el token en localStorage
        //             localStorage.setItem('token', response.data.answer.token);
        //             setCookie("token", response.data.answer.token, 1);
        //             localStorage.setItem('userRole', response.data.answer.rol);

        //             // Redirigir a la página de inicio
        //             $location.path('/home');
        //         } else {
        //             // Manejar el caso de inicio de sesión fallido
        //             console.log('Inicio de sesión fallido');
        //         }
        //     })
        //     .catch(function (error) {
        //         console.error('Error al iniciar sesión:', error);
        //     });
    };

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
    token = localStorage.getItem('token') || getCookie('token');
    // token = "Token De Prueba";

    $rootScope.hasSession = token ? true : false;

    if (requiresAuth && !token) {
        // Redirigir a la página de inicio de sesión si no hay token
        $location.path('/login');
    }
}

function checkUserRole(requiredRoles) {
    var userRole = localStorage.getItem('userRole');
    return requiredRoles.includes(userRole);
}

// Función para obtener el valor de una cookie por nombre
function getCookie(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
}

// Función para Crear una cookie
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
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