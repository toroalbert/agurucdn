const title = "Agurus";
let app = angular.module("app-root", ['ngRoute', 'ngSanitize']);
const sessionMinutes = 0.03125; //(45 min)
// const sessionMinutes = 0.0001;
var token = false;
routes = routes.concat(templateRoutes);
let allRoutes = routes.concat(customRoutes);

app.run(function ($rootScope, $location, $rootScope, AuthService) {
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        // Llamada a la función al cambiar de ruta
        val_login($location, $rootScope, next);
        var requiredRoles = next.$$route && next.$$route.requiredRoles;
        // console.log("Aca", next);
        if (requiredRoles && !checkUserRole(requiredRoles)) {
            // El usuario no tiene los roles necesarios, redirige a alguna página de error o a otra página
            event.preventDefault();
            $location.path('/unauthorized');
        }
    });
    AuthService.startTokenCheckInterval();
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

app.service('UserService', function () {
    var user = JSON.parse(localStorage.getItem('user')) || {}; // Almacena la información del usuario

    return {
        getUser: function () {
            return user;
        },
        setUser: function (newUser) {
            user = newUser;
            localStorage.setItem('user', JSON.stringify(user));
        },
        clearUser: function () {
            user = {};
            localStorage.removeItem('user');
        }
    };
});

app.service('AuthService', function ($location, $interval) {
    return {
        checkToken: function () {

            var currentPath = $location.path();

            // Verificar si la ruta actual es /login, /register, /forgot-password o /404
            var currentRoute = routes.find(function (route) {
                return route.path === currentPath;
            });

            // Verificar si la ruta existe (en las rutas principles del Sistema)
            if (!currentRoute) {
                token = Cookies.get('token');
                // console.log("Verificar Token", token);
                if (!token) {
                    $location.path('/logout');
                }
            }
        },
        startTokenCheckInterval: function () {
            // Establece un intervalo para verificar el token cada X milisegundos
            $interval(this.checkToken, 1000 * 5); // Por ejemplo, cada 1 min (60 segundos)
        }
    };
});

app.controller("HomeController", function ($scope, $rootScope, UserService) {
    // Resto del código para HomeController
    $rootScope.title = `${title} - Home`;
    $rootScope.sidebar = $sidebar;
    $rootScope.user = UserService.getUser();
});

app.controller("iconsController", function ($scope, $rootScope, $location, $http, UserService) {
    // Resto del código para HomeController
    $rootScope.title = `${title} - Icons`;
    $rootScope.sidebar = $sidebar;
    $scope.searchText = $rootScope.searchText;
    $rootScope.user = UserService.getUser();
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

app.controller("LoginController", function ($scope, $rootScope, $location, $http, UserService) {
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

                    UserService.setUser(response.data.answer);
                    Cookies.set('token', response.data.answer.token, { expires: sessionMinutes })
                    localStorage.setItem('userRole', response.data.answer.rol_alias);

                    // Redirigir a la página de inicio
                    // $window.location.href = '#!/home';
                    window.location.href = '/admin';
                    // $location.path('/home');
                } else {
                    // Manejar el caso de inicio de sesión fallido
                    // console.log('Inicio de sesión fallido');
                }
            })
            .catch(function (response) {
                // let errorMessagePrefix = response.data.error.split(':')[0];
                // errorHtml = `
                //     <div class="alert alert-warning alert-dismissible fade show" role="alert">
                //          <strong>${errorMessagePrefix}</strong>:${response.data.error.substring(errorMessagePrefix.length + 1)}
                //         <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                //             <span aria-hidden="true">&times;</span>
                //         </button>
                //     </div>
                // `;
                // $('.showerror').html(errorHtml);

                showAlert("danger", response.data.error);
                console.error('Error al iniciar sesión:', response);
            });
    };

    startAnimation();
});

app.controller("RegisterController", function ($scope, $rootScope, $location, $http, UserService) {
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
                    UserService.setUser(response.data.answer);
                    Cookies.set('token', response.data.answer.token, { expires: sessionMinutes })
                    localStorage.setItem('userRole', response.data.answer.rol_alias);
                    // Redirigir a la página de inicio
                    $location.path('/home');
                } else {
                    // Manejar el caso de inicio de sesión fallido
                    // console.log('Inicio de sesión fallido');
                }
            })
            .catch(function (response) {
                // let errorMessagePrefix = response.data.error.split(':')[0];
                // errorHtml = `
                //     <div class="alert alert-warning alert-dismissible fade show" role="alert">
                //          <strong>${errorMessagePrefix}</strong>:${response.data.error.substring(errorMessagePrefix.length + 1)}
                //         <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                //             <span aria-hidden="true">&times;</span>
                //         </button>
                //     </div>
                // `;
                // $('.showerror').html(errorHtml);
                showAlert("danger", response.data.error);
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

app.controller("LogOutController", function ($scope, $rootScope, $location, UserService) {
    $rootScope.title = `${title} - Log Out`;

    // Elimitar TOken de usuario
    token = false;
    // document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    Cookies.remove('token')
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    UserService.clearUser();
    // Cierra la modal con el Boton 'btn-LogOutClose'
    $(".btn-LogOutClose").click();

    $location.path('/login');
    // window.location.href = '/';

});

function val_login($location, $rootScope, nextRoute) {
    // Verificar si la ruta requiere autenticación
    var requiresAuth = nextRoute.$$route && nextRoute.$$route.requiresAuth;

    // Verificar si el token está presente en localStorage o cookies
    token = Cookies.get('token');
    $rootScope.userRole = userRole = localStorage.getItem('userRole');
    // token = "Token De Prueba";
    // console.log("token", token);

    $rootScope.hasSession = token ? true : false;

    if (requiresAuth && !token) {
        // Redirigir a la página de inicio de sesión si no hay token
        $location.path('/logout');
    }
    // if (token) {
    //     loadScript(userRole);
    // }
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

// var loadedScripts = {};

// function loadScript(alias) {
//     if (loadedScripts[alias]) {
//         return Promise.resolve();
//     }

//     let scriptPath = $base_url + 'js/path/' + alias + '.js' + '?v=' + Date.now();
//     console.log("LoadScript", scriptPath);

//     return new Promise((resolve, reject) => {
//         $.ajax({
//             url: scriptPath,
//             type: 'HEAD',
//             // dataType: 'script',
//             // cache: true, // Usar la caché del navegador
//             success: () => {
//                 console.log("loading");
//                 loadedScripts[alias] = true;
//                 // $("#scripts").append(`<script id="TempScript" alias="${alias}" src="${scriptPath}"></script>`);
//                 // $("#TempScript").change();
//                 // resolve();


//                 // Cargar el script dinámicamente usando $.getScript
//                 // $.getScript(scriptPath, function () {
//                 //     console.log("Finish Script");

//                 //     // Obtener el alias del atributo y agregar el módulo a la lista de requeridos
//                 app.requires.push(alias + "-module");

//                 //     // Verificar los módulos cargados en AngularJS
//                 console.log('Módulos cargados en AngularJS:', angular.module('app-root').requires);
//                 //     resolve();
//                 // });
//             },
//             error: () => reject(new Error('Error al cargar el script ' + alias))
//         });
//     }).then(() => {
//         // app.requires.push(alias + "-module");
//         // console.log('Módulos cargados en AngularJS:', angular.module('app-root').requires);
//     });
// }