const title = "Agurus";
const app = angular.module("app-root", ['ngRoute', 'ngSanitize']);

let allRoutes = webRoutes.concat(customRoutes);

app.run(function ($rootScope, $location, $rootScope, $timeout) {
    $rootScope.$on('$locationChangeSuccess', function () {
        // Espera un breve momento para asegurar que la vista se ha actualizado
        $timeout(function () {
            // Elimina los elementos .tooltip.show
            $(".tooltip.show").remove();
        });
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

    $routeProvider.otherwise({
        redirectTo: '/',
    });
});

app.directive('preload', function () {
    return {
        restrict: 'E',
        templateUrl: 'views/template/preload.html',
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
    $scope.event = $event;
    $scope.sports = $typeSport;
    // console.log("aca");
});