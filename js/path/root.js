
customRoutes = [
    {
        path: '/home',
        templateUrl: $base_url + 'views/desing/home.html',
        controller: 'RootHomeController',
        requiresAuth: true,
    },
    {
        path: '/events',
        templateUrl: $base_url + 'views/path/events.html',
        controller: 'EventsController',
        requiresAuth: true,
    },
    {
        path: '/addevents',
        templateUrl: $base_url + 'views/path/events_add.html',
        controller: 'AddEventsController',
        requiresAuth: true,
    },
    {
        path: '/editevents/:eventId',
        templateUrl: $base_url + 'views/path/events_add.html',
        controller: 'EditEventsController',
        requiresAuth: true,
    }
]

$sidebar = [
    {
        "header": "Root",
    },
    // {
    //     "icon": "fa-burn",
    //     "name": "Events",
    //     "subMenu": [
    //         { "name": "Show", "link": "#!/events" },
    //         { "name": "Add", "link": "#!/addevents" },
    //         { "name": "Icons", "link": "#!/icons" }
    //     ]
    // },
    {
        "icon": "fa-burn",
        "name": "Events",
        "link": "#!/events"
    },
    {
        "icon": "fa-table",
        "name": "Tables",
        "link": "#!/tables"
    },
];

var newModule = angular.module("root-module", ['ngRoute']);

newModule.config(function ($routeProvider) {
    // console.log("ROOT FILE CONFIG");
    customRoutes.forEach(route => {
        $routeProvider.when(route.path, {
            templateUrl: route.templateUrl,
            controller: route.controller,
            requiresAuth: route.requiresAuth,
            // Puedes agregar más propiedades según sea necesario
        });
    });
});


newModule.controller("RootHomeController", function ($scope, $rootScope, $location, $http) {
    // console.log("ROOT FILE Controller");
    $rootScope.title = `${title} - Home`;
    $rootScope.sidebar = $sidebar;
});


newModule.controller("EventsController", function ($scope, $rootScope, $location, $http, $timeout) {
    // console.log("ROOT FILE Controller");
    $rootScope.title = `${title} - Events`;
    $rootScope.sidebar = $sidebar;
    $scope.eventsArray = [];
    addSpin("h1");

    $http({
        method: 'POST',
        url: 'api/events',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(`${token}:`)
        },
        params: {
            // token: token
        },
        // data: serialize({
        //     token: token
        // }),
    })
        .then(function (response) {
            // console.log(response.data);
            $scope.eventsArray = response.data.answer;
            // $scope.eventsArray = generateFalseData(1500);
        })
        .catch(function (response) {
            delSpin(false);
            console.error(response.data);
        })
        .finally(function () {
            $timeout(function () {
                $("#eventsTable").DataTable();
                $('#imageModal').on('show.bs.modal', function (event) {
                    var imageUrl = $(event.relatedTarget).attr('href');
                    $(this).find('img').attr('src', imageUrl);
                });
                $('[data-toggle="tooltip"]').tooltip();
                delSpin(true);
            });
        });

    $scope.deleteevents = function (item) {
        $scope.toDelete = item._id.$oid;
        $scope.toDeleteName = item.name;
        $("#confirmDelete").focus();
    }
});

newModule.controller("AddEventsController", function ($scope, $rootScope, $location, $http, $timeout) {
    $rootScope.title = `${title} - Agregar Evento`;
    $rootScope.sidebar = $sidebar;
    $scope.h1 = "Agregar Evento ";
    addSpin("h1");
    $scope.genSlug = function () {
        if ($scope.evento && $scope.evento.name) {
            // Obtener el nombre del evento desde el modelo
            var nombreEvento = $scope.evento.name;

            // Reemplazar espacios con guiones y convertir a minúsculas
            var slug = nombreEvento.replace(/\s+/g, '-').toLowerCase();

            // Asignar el resultado al modelo del Slug
            $scope.evento.slug = slug;
        } else {
            $scope.evento.slug = '';
        }
    };
    // En tu controlador
    $scope.evento = {
        campos: []
    };

    $scope.addCampo = function () {
        $scope.evento.campos.push({
            name: '',
            alias: ''
            // Otros campos que necesites
        });
    };

    $scope.removeCampo = function (index) {
        $scope.evento.campos.splice(index, 1);
    };

    $timeout(function () {
        activeHref("#!/events");
        $('[data-toggle="tooltip"]').tooltip()
        delSpin(true);
    });

});


newModule.controller("EditEventsController", function ($scope, $rootScope, $location, $http, $timeout, $routeParams) {
    $rootScope.title = `${title} - Editar Evento`;
    $rootScope.sidebar = $sidebar;
    let eventId = $routeParams.eventId;
    $scope.h1 = "Editar Evento ";
    addSpin("h1");
    // Resto del código del controlador...
    $http({
        method: 'POST',
        url: 'api/event/' + eventId,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(`${token}:`)
        },
        params: {
            // token: token
        },
        // data: serialize({
        //     token: token
        // }),
    })
        .then(function (response) {
            // console.log(response.data);
            $scope.evento = response.data.answer;
            // $scope.h1 += `(${$scope.evento.name})`
        })
        .catch(function (response) {
            delSpin(false);
            console.error(response.data);
        })
        .finally(function () {
            $timeout(function () {
                $('#imageModal').on('show.bs.modal', function (event) {
                    var imageUrl = $(event.relatedTarget).attr('href');
                    $(this).find('img').attr('src', imageUrl);
                });
                activeHref("#!/events");
                $('[data-toggle="tooltip"]').tooltip()
                delSpin(true);
            });
        });

    $scope.addCampo = function () {
        $scope.evento.campos.push({
            name: '',
            alias: ''
            // Otros campos que necesites
        });
    };

    $scope.removeCampo = function (index) {
        $scope.evento.campos.splice(index, 1);
    };
});

angular.module('app-root').requires.push('root-module');
