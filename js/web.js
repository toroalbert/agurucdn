const title = "Agurus";
const app = angular.module("app-root", ['ngRoute', 'ngSanitize']);

let allRoutes = webRoutes.concat(customRoutes);

app.run(function ($rootScope, $location, $rootScope, $timeout) {
    $rootScope.event = $event;
    $rootScope.sports = $typeSport;
    $rootScope.matches = $matches;
    $rootScope.sportSelected = null;
    if (localStorage.getItem("theme")) {
        $rootScope.theme = localStorage.getItem("theme");
    }
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

app.filter('nombreMes', function () {
    var meses = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
    return function (numeroMes) {
        return meses[numeroMes - 1];
    };
});

app.controller("HomeController", function ($scope, $rootScope, $timeout) {
    // Resto del código para HomeController
    $rootScope.title = `${title} - Home`;
    $scope.event = $event;
    $scope.sports = $typeSport;
    // console.log("aca");
    
    $timeout(function () {
        $matches.forEach(match => {
            if(match.date){
                let DateF = FormatFecha(match.date.$date.$numberLong);
                $("." + match.sport + '-' + DateF).each(function (index) {
                    if (index > 0) {
                        $(this).remove();
                    }
                });
            }
        });
    });

});

app.controller("MatchController", function ($scope, $rootScope, $routeParams) {
    // Resto del código para HomeController
    $rootScope.title = `${title} - Match`;
    $scope.id = $routeParams.matchId;
    $http
    // console.log("aca");
});



$(document).ready(function () {
    var scrollContainer = $('#global-scoreboard');

    $('.global-right').on('click', function () {
        var $target = $(this).data("target");
        var targetDiv = $('#tittle-' + $target);
        if (targetDiv[0]) {
            var targetOffset = targetDiv.offset().left - scrollContainer.offset().left + scrollContainer.scrollLeft();
            scrollContainer.animate({
                scrollLeft: targetOffset
            }, 300);
            // $(".tittle").removeClass("active");
            // targetDiv.addClass("active");
            $(this).data("target", (parseInt($target) + 1));
            $('.global-left').data("target", (parseInt($target) - 1));
        } else {
            scrollContainer.animate({
                scrollLeft: scrollContainer[0].scrollWidth - scrollContainer.width()
            }, 300);
        }
    });

    $('.global-left').on('click', function () {
        var $target = $(this).data("target");
        var targetDiv = $('#tittle-' + $target);
        if (targetDiv[0]) {
            var targetOffset = targetDiv.offset().left - scrollContainer.offset().left + scrollContainer.scrollLeft();
            scrollContainer.animate({
                scrollLeft: targetOffset
            }, 300);
            // $(".tittle").removeClass("active");
            // targetDiv.addClass("active");
            $(this).data("target", (parseInt($target) - 1));
            $('.global-right').data("target", (parseInt($target) + 1));
        } else {
            scrollContainer.animate({
                scrollLeft: 0
            }, 300);
        }
    });
});



$(document).on('click', '.active-theme', function () {
    setTheme($(this).data("theme"));
});


if (localStorage.getItem("theme")) {
    setTheme(localStorage.getItem("theme"));
}


function FormatFecha(dateNumberLong) {
    var fecha = new Date(parseInt(dateNumberLong));
    var fechaFormateada = fecha.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' });

    fechaFormateada = fechaFormateada.replace(/\//g, '-');

    // console.log("fechaFormateada", fechaFormateada)
    return fechaFormateada;
};