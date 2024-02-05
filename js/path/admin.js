// console.log("ROOT FILE CONFIG");
customRoutes = [
    {
        path: '/home',
        templateUrl: $base_url + 'views/desing/home.html',
        controller: 'RootHomeController',
        requiresAuth: true,
    },

    //Users Rout - GET/DELETE
    {
        path: '/users',
        templateUrl: $base_url + 'views/path/users.html',
        controller: 'userController',
        requiredRoles: ['admin'],
        requiresAuth: true,
    },
    //Users Rout - CREATE
    {
        path: '/addusers',
        templateUrl: $base_url + 'views/path/users_add.html',
        controller: 'userAddController',
        requiresAuth: true,
    },
    //Users Rout - EDIT
    {
        path: '/editusers/:userId',
        templateUrl: $base_url + 'views/path/users_add.html',
        controller: 'userEditController',
        requiresAuth: true,
    },


    //typePerson Rout - GET/DELETE
    {
        path: '/typePerson',
        templateUrl: $base_url + 'views/path/typePerson.html',
        controller: 'typePersonController',
        requiresAuth: true,
    },
    //typePerson Rout - CREATE
    {
        path: '/addtypePerson',
        templateUrl: $base_url + 'views/path/typePerson_add.html',
        controller: 'typePersonAddController',
        requiresAuth: true,
    },
    //typePerson Rout - EDIT
    {
        path: '/edittypePerson/:datosId',
        templateUrl: $base_url + 'views/path/typePerson_add.html',
        controller: 'typePersonEditController',
        requiresAuth: true,
    },


    //typeSport Rout - GET/DELETE
    {
        path: '/typeSport',
        templateUrl: $base_url + 'views/path/typeSport.html',
        controller: 'typeSportController',
        requiresAuth: true,
    },
    //typeSport Rout - CREATE
    {
        path: '/addtypeSport',
        templateUrl: $base_url + 'views/path/typeSport_add.html',
        controller: 'typeSportAddController',
        requiresAuth: true,
    },
    //typeSport Rout - EDIT
    {
        path: '/edittypeSport/:datosId',
        templateUrl: $base_url + 'views/path/typeSport_add.html',
        controller: 'typeSportEditController',
        requiresAuth: true,
    },

       //person Rout - GET/DELETE
       {
        path: '/person',
        templateUrl: $base_url + 'views/path/person.html',
        controller: 'personController',
        requiresAuth: true,
    },
    //person Rout - CREATE
    {
        path: '/addperson',
        templateUrl: $base_url + 'views/path/person_add.html',
        controller: 'personAddController',
        requiresAuth: true,
    },
    //person Rout - EDIT
    {
        path: '/editperson/:datosId',
        templateUrl: $base_url + 'views/path/person_add.html',
        controller: 'personEditController',
        requiresAuth: true,
    },

    // Matches Rout - GET/DELETE
    {
        path: '/matches',
        templateUrl: $base_url + 'views/path/matches.html',
        // templateUrl: $base_url + 'views\path\matches.html',
        controller: 'matchesController',
        requiresAuth: true,
    },
    // Matches Rout - CREATE
    {
        path: '/addmatches',
        templateUrl: $base_url + 'views/path/matches_add.html',
        controller: 'matchesAddController',
        requiresAuth: true,
    },
    // Matches Rout - EDIT
    {
        path: '/editmatches/:datosId',
        templateUrl: $base_url + 'views/path/matches_add.html',
        controller: 'matchesEditController',
        requiresAuth: true,
    },

    // carnet Rout - EDIT
    {
        path: '/carnet/:datosId',
        templateUrl: $base_url + 'views/carnet.html',
        controller: 'personEditController',
        requiresAuth: true,
    },
]

$sidebar = [
    {
        "header": "Root",
    },
    {
        "icon": "fa-user",
        "name": "Users",
        "fields": false,
        "link": "#!/users"
    },
    {
        "icon": "fa-list",
        "name": "Types",
        "subMenu": [
            {
                "icon": "fa-user-graduate",
                "name": "Person",
                "segment": "typePerson",
                "fields": true,
                "link": "#!/typePerson"
            },
            {
                "icon": "fa-heartbeat",
                "name": "Sport",
                "segment": "typeSport",
                "fields": true,
                "fieldsResult": true,
                "link": "#!/typeSport"
            },
        ]
    },
    {
        "icon": "fa-id-card-alt",
        "name": "Person",
        "segment": "person",
        // "fields": true,
        "typePerson": true,
        "link": "#!/person"
    },
    {
        "icon": "fa-dice-d6",
        "name": "Matches",
        "segment": "matches",
        // "fields": true,
        // "typePerson": true,
        "delegations": true,
        "link": "#!/matches"
    },
];

var newModule = angular.module("root-module", ['ngRoute', 'app-root', 'ngFileUpload', 'ngSanitize', 'angular-bind-html-compile', "ui.select2"]);

newModule.config(function ($routeProvider) {
    console.log("ROOT FILE CONFIG");
    customRoutes.forEach(route => {
        $routeProvider.when(route.path, {
            templateUrl: route.templateUrl,
            controller: route.controller,
            requiresAuth: route.requiresAuth,
            // Puedes agregar más propiedades según sea necesario
        });
    });

    $routeProvider.when('/login', {
        redirectTo: '/home' // Redirige a la página home cuando la URL es /login
    });
});

newModule.controller("RootHomeController", function ($scope, $rootScope, $location, $http, UserService) {
    // console.log("ROOT FILE Controller");
    $rootScope.title = `${title} - Home`;
    $rootScope.sidebar = $sidebar;
    $rootScope.user = UserService.getUser();
});

// Users Controllers 

newModule.controller("userController", function ($scope, $rootScope, $location, $http, $timeout, UserService) {
    // console.log("ROOT FILE Controller");
    $rootScope.title = `${title} - Users`;
    $scope.h1 = "Users";
    $rootScope.sidebar = $sidebar;
    $rootScope.user = UserService.getUser();

    $scope.eventsArray = [];
    addSpin("h1");

    reloadUsers();

    $scope.deleteusers = function (item) {
        $scope.toDelete = item._id.$oid;
        $scope.toDeleteName = item.username;
        $timeout(function () {
            $("#confirmDelete").focus();
        });
    }

    $scope.confirmDelete = function (toDelete) {

        addSpin("h1");
        $http({
            method: 'POST',
            url: 'api/delete/user/' + toDelete,
            // url: 'api/request',
            headers: {
                // 'Content-Type': 'application/x-www-form-urlencoded',
                // 'Content-Type': false,
                'Content-Type': undefined,
                'Authorization': 'Basic ' + btoa(`${token}:`)
            },
            // data: $formData,
            transformRequest: angular.identity
        })
            .then(function (response) {
                // console.log(response);
                showAlert("success", "Success: Event Deleted Successfully");
                // $location.path('/events');
                reloadRols();
                // $location.path('/editevents/' + eventId);
            })
            .catch(function (response) {
                console.error(response);
                if (response.data.error) {
                    showAlert("danger", response.data.error);
                }
                delSpin(false);
            }).finally(function () {
                $timeout(function () {
                    delSpin(true);
                });
            })

    }

    function reloadUsers() {
        $http({
            method: 'POST',
            url: 'api/user',
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
                console.log(response.data);
                $scope.dataArray = response.data.answer;
                // $scope.eventsArray = generateFalseData(1500);
            })
            .catch(function (response) {
                delSpin(false);
                showAlert("danger", response.data.error);
                console.error(response.data);
            })
            .finally(function () {
                $timeout(function () {
                    $("#dataTable").DataTable();
                    $('#imageModal').on('show.bs.modal', function (event) {
                        var imageUrl = $(event.relatedTarget).attr('href');
                        $(this).find('img').attr('src', imageUrl);
                        $(this).find('a').attr('href', imageUrl);
                    });
                    $('[data-toggle="tooltip"]').tooltip();
                    delSpin(true);
                });
            });
    }

});

newModule.controller("userAddController", function ($scope, $rootScope, $location, $http, $timeout, UserService) {
    $rootScope.title = `${title} - Agregar User`;
    $rootScope.sidebar = $sidebar;
    $scope.h1 = "Agregar User ";
    $scope.token = token;
    $scope.rols = $rols;
    $rootScope.user = UserService.getUser();

    addSpin("h1");

    $scope.submitUser = function () {

        let $formData = new FormData($("#eventoForm")[0]);
        let alias = $(`option[value="${$("#roles").val()}"]`).attr("alias");
        $formData.append('rol_alias', alias);
        addSpin("h1");
        $http({
            method: 'POST',
            url: 'api/create/user',
            // url: 'api/request',
            headers: {
                'Content-Type': undefined,
                'Authorization': 'Basic ' + btoa(`${token}:`)
            },
            data: $formData,
            transformRequest: angular.identity
        })
            .then(function (response) {
                console.log(response);
                showAlert("success", "Success: Event Create Successfully");
                $location.path('/users');
            })
            .catch(function (response) {
                // console.error(response);
                showAlert("danger", response.data.error);
                delSpin(false);
            }).finally(function () {
                $timeout(function () {
                    delSpin(true);
                });
            })
    };

    $timeout(function () {
        activeHref("#!/users");
        $('[data-toggle="tooltip"]').tooltip()
        delSpin(true);
    });

});

newModule.controller("userEditController", function ($scope, $rootScope, $location, $http, $timeout, $routeParams, UserService) {
    $rootScope.title = `${title} - Editar Usuario`;
    $rootScope.sidebar = $sidebar;
    $scope.rols = $rols;
    $rootScope.user = UserService.getUser();
    let userId = $routeParams.userId;
    $scope.id = userId;
    $scope.token = token;
    $scope.h1 = "Editar Rols ";
    addSpin("h1");
    // Resto del código del controlador...
    $http({
        method: 'POST',
        url: 'api/user/' + userId,
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
            $scope.users = response.data.answer;
            // $scope.h1 += `(${$scope.evento.name})`
        })
        .catch(function (response) {
            delSpin(false);
            showAlert("danger", response.data.error);
            console.error(response.data);
        })
        .finally(function () {
            $timeout(function () {
                $('#imageModal').on('show.bs.modal', function (event) {
                    var imageUrl = $(event.relatedTarget).attr('href');
                    $(this).find('img').attr('src', imageUrl);
                    $(this).find('a').attr('href', imageUrl);
                });
                activeHref("#!/rols");
                $('[data-toggle="tooltip"]').tooltip()
                delSpin(true);
            });
        });

    $scope.submitUser = function () {

        let $formData = new FormData($("#eventoForm")[0]);
        let alias = $(`option[value="${$("#roles").val()}"]`).attr("alias");
        $formData.append('rol_alias', alias);
        addSpin("h1");
        $http({
            method: 'POST',
            url: 'api/update/user/' + userId,
            // url: 'api/request',
            headers: {
                // 'Content-Type': 'application/x-www-form-urlencoded',
                // 'Content-Type': false,
                'Content-Type': undefined,
                'Authorization': 'Basic ' + btoa(`${token}:`)
            },
            data: $formData,
            transformRequest: angular.identity
        })
            .then(function (response) {
                // console.log(response);
                showAlert("success", "Success: Event Modified Successfully");
                $location.path('/users');
                // $location.path('/editevents/' + eventId);
            })
            .catch(function (response) {
                // console.error(response);
                showAlert("danger", response.data.error);
                delSpin(false);
            }).finally(function () {
                $timeout(function () {
                    delSpin(true);
                });
            })
    };

});

$menus = [];
$sidebar.forEach(function (sideitem) {
    if (sideitem.segment) {
        $menus.push(sideitem);
    }
    if (sideitem.subMenu) {
        sideitem.subMenu.forEach(function (subMnu) {
            if (subMnu.segment) {
                $menus.push(subMnu);
            }
        });
    }
});

// All Sidebar Controller
$menus.forEach(function (sideitem) {

    //CRUD - Read/Delete
    newModule.controller(`${sideitem.segment}Controller`, function ($scope, $rootScope, $location, $http, $timeout, UserService) {
        $rootScope.title = `${title} - ${sideitem.name}`;
        $scope.h1 = sideitem.name;
        $scope.segment = sideitem.segment;
        console.log("Segment: ", sideitem.segment);
        $rootScope.sidebar = $sidebar;
        $rootScope.types = $types;
        $rootScope.user = UserService.getUser();
        $scope.event = $event;

        $scope.eventsArray = [];

        $scope.delete = function (item) {
            console.log(item)
            $scope.toDelete = item._id.$oid;
            $scope.toDeleteName = item.alias || item.dni || Object.values(item)[1] || item._id.$oid || null;
            $timeout(function () {
                $("#confirmDelete").focus();
            });
        }

        $scope.confirmDelete = function (toDelete) {

            addSpin("h1");
            $http({
                method: 'POST',
                url: 'api/delete/' + sideitem.segment + '/' + toDelete,
                // url: 'api/request',
                headers: {
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    // 'Content-Type': false,
                    'Content-Type': undefined,
                    'Authorization': 'Basic ' + btoa(`${token}:`)
                },
                // data: $formData,
                transformRequest: angular.identity
            })
                .then(function (response) {
                    console.log(response);
                    showAlert("success", "Success: Event Deleted Successfully");
                    // $location.path('/events');
                    reload();
                    // $location.path('/editevents/' + eventId);
                })
                .catch(function (response) {
                    // console.error(response);
                    showAlert("danger", response.data.error);
                    delSpin(false);
                }).finally(function () {
                    $timeout(function () {
                        // delSpin(true);
                    });
                })

        }

        function reload() {

            $http({
                method: 'POST',
                url: 'api/' + sideitem.segment,
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
                    $scope.dataArray = response.data.answer;
                    // $scope.eventsArray = generateFalseData(1500);
                })
                .catch(function (response) {
                    delSpin(false);
                    showAlert("danger", response.data.error);
                    console.error(response.data);
                })
                .finally(function () {
                    $timeout(function () {
                        delSpin(true);
                        $("#dataTable").DataTable();
                        $('[data-toggle="tooltip"]').tooltip();
                        $('#imageModal').on('show.bs.modal', function (event) {
                            var imageUrl = $(event.relatedTarget).attr('href');
                            $(this).find('img').attr('src', imageUrl);
                            $(this).find('a').attr('href', imageUrl);
                        });
                    });
                });
        }

        addSpin("h1");
        reload();
    });

    //CRUD - Create
    newModule.controller(`${sideitem.segment}AddController`, function ($scope, $rootScope, $location, $http, $timeout, UserService, $sce) {
        $rootScope.title = `${title} - Agregar ${sideitem.name}`;
        $rootScope.sidebar = $sidebar;
        $rootScope.types = $types;
        $scope.h1 = `Agregar ${sideitem.name}`;
        $scope.segment = sideitem.segment;
        $scope.event = $event;
        $scope.token = token;
        $scope.rols = $rols;
        $rootScope.user = UserService.getUser();
        $scope.datos = {};

        $scope.generateFieldHTML = function (field, other = null) {
            return generateFieldHTML(field, other);
        };



        addSpin("h1");

        $scope.genAlias = function () {
            if ($scope.datos && $scope.datos.name) {
                // Obtener el nombre del evento desde el modelo
                var nombre = $scope.datos.name;

                // Reemplazar espacios con guiones y convertir a minúsculas
                var alias = nombre.replace(/\s+/g, '-').toLowerCase();

                // Asignar el resultado al modelo del Slug
                $scope.datos.alias = alias;
            } else {
                $scope.datos.alias = '';
            }
        };

        if (sideitem.fields || sideitem.fieldsResult) {
            $scope.datos.fields = [];
            $scope.datos.fieldsResult = [];
        }
        if (sideitem.fields) {
            $scope.addCampo = function () {
                $scope.datos.fields.push({
                    name: '',
                    alias: ''
                    // Otros campos que necesites
                });
                $timeout(function () {
                    $('[data-toggle="tooltip"]').tooltip();
                });
            };

            $scope.removeCampo = function (index) {
                $scope.datos.fields.splice(index, 1);
            };

            $scope.addOption = function (campoIndex) {
                var campo = $scope.datos.fields[campoIndex];

                if (!campo.options) {
                    campo.options = [];
                }
                campo.options.push({ name: '', value: '' });

                $timeout(function () {
                    $('[data-toggle="tooltip"]').tooltip();
                });
            };

            $scope.removeOption = function (campo, index) {
                campo.options.splice(index, 1);
            };
        }

        if (sideitem.fieldsResult) {
            $scope.addCampoResult = function () {
                $scope.datos.fieldsResult.push({
                    name: '',
                    alias: ''
                    // Otros campos que necesites
                });
                $timeout(function () {
                    $('[data-toggle="tooltip"]').tooltip();
                });
            };

            $scope.removeCampoResult = function (index) {
                $scope.datos.fieldsResult.splice(index, 1);
            };

            $scope.addOptionResult = function (campoIndex) {
                var campo = $scope.datos.fieldsResult[campoIndex];

                if (!campo.options) {
                    campo.options = [];
                }
                campo.options.push({ name: '', value: '' });

                $timeout(function () {
                    $('[data-toggle="tooltip"]').tooltip();
                });
            };

            $scope.removeOptionResult = function (campo, index) {
                campo.options.splice(index, 1);
            };
        }

        $scope.selectedOptions = [];

        $scope.ordenSelectOption = function (selected) {

            // Filtrar el array de opciones seleccionadas para eliminar las deseleccionadas
            $scope.selectedOptions = $scope.selectedOptions.filter(option => selected.includes(option));

            // Agregar las opciones seleccionadas que no estén en el array
            selected.forEach(option => {
                if (!$scope.selectedOptions.includes(option)) {
                    $scope.selectedOptions.push(option);
                }
            });

            // Puedes usar $scope.selectedOptions como desees.
            // console.log($scope.selectedOptions);
        };

        $scope.submitEvent = function () {
            // console.log($scope.datos);
            // return;
            let $formData = new FormData($("#Form")[0]);

            if (sideitem.fields) {
                $scope.datos.fields.forEach(function (campo, i) {
                    $formData.append('fields[' + i + '][name]', campo.name);
                    $formData.append('fields[' + i + '][alias]', campo.alias);
                    $formData.append('fields[' + i + '][icon]', campo.icon);
                    $formData.append('fields[' + i + '][type]', campo.type);
                    if (campo.type == "select") {
                        campo.options.forEach(function (option, j) {
                            $formData.append('fields[' + i + '][options][' + j + '][name]', option.name);
                            $formData.append('fields[' + i + '][options][' + j + '][value]', option.value);
                        });
                    }
                });
            }

            if (sideitem.delegations) {
                $formData.append('delegation', []);
                $scope.selectedOptions.forEach(function (campo, i) {
                    console.log("dekegation " + i, campo);
                    $formData.append('delegation[' + i + ']', campo);
                });
            }

            if (sideitem.fieldsResult) {
                $scope.datos.fieldsResult.forEach(function (campo, i) {
                    $formData.append('fieldsResult[' + i + '][name]', campo.name);
                    $formData.append('fieldsResult[' + i + '][alias]', campo.alias);
                    $formData.append('fieldsResult[' + i + '][icon]', campo.icon);
                    $formData.append('fieldsResult[' + i + '][type]', campo.type);
                    if (campo.type == "select") {
                        campo.options.forEach(function (option, j) {
                            $formData.append('fieldsResult[' + i + '][options][' + j + '][name]', option.name);
                            $formData.append('fieldsResult[' + i + '][options][' + j + '][value]', option.value);
                        });
                    }
                });
            }
            addSpin("h1");
            $http({
                method: 'POST',
                url: 'api/create/' + sideitem.segment,
                headers: {
                    'Content-Type': undefined,
                    'Authorization': 'Basic ' + btoa(`${token}:`)
                },
                data: $formData,
                transformRequest: angular.identity
            })
                .then(function (response) {
                    console.log(response);
                    showAlert("success", "Success: Event Create Successfully");
                    $location.path('/' + sideitem.segment);
                })
                .catch(function (response) {
                    // console.error(response);
                    showAlert("danger", response.data.error);
                    delSpin(false);
                }).finally(function () {
                    $timeout(function () {
                        delSpin(true);
                    });
                })
        };

        if (sideitem.delegations) {
            $scope.datos.sport = null;
            $scope.datos.delegation = null;

            $scope.persons = [];

            $scope.delegations = [];
            $scope.typeSport = [];
            $scope.typeSportSelected = [];


            getPersons().then(function (data) {
                $scope.persons = data;
                console.log("persons", data);
            });

            getDelegations().then(function (data) {
                $scope.delegations = data;
            });

            getTypeSport().then(function (data) {
                $scope.typeSport = data;
                // $scope.typerSportSelectedFN();
                $timeout(function () {
                    activeHref(sideitem.link);
                    $('[data-toggle="tooltip"]').tooltip()
                    delSpin(true);
                });
            });

            $scope.typerSportSelectedFN = function () {
                // Haz algo con el objeto 'item' aquí
                $scope.typeSport.forEach(element => {
                    if (element.alias == $scope.datos.sport) {
                        $scope.typeSportSelected = element;
                    }
                });
                // console.log($scope.typeSportSelected);
            };

            $scope.getPersonName = function (dni) {

                // Buscar el objeto de persona en la lista original (persons) por el DNI
                var person = $scope.persons.find(function (item) {
                    return item.dni === dni;
                });

                // Obtener el nombre y apellido si se encuentra la persona
                var labelText = person ? (person.name + ' ' + person.lastname) : '';

                return labelText;
            };
        }



        if (sideitem.typePerson) {
            $scope.datos.typePerson = null;

            $scope.typePerson = {};
            $scope.typePersonHtml = "";
            $scope.typePersonFields = [];
            $scope.typeSport = {};
            $scope.typeSportHtml = {};
            $scope.typeSportFields = [];
            getTypePerson().then(function (data) {
                $scope.typePerson = data;
                console.log("typePerson", data);
                let temp = {
                    name: "Typer Person",
                    alias: "typePerson",
                    type: "select",
                    options: [],
                }
                data.forEach(element => {
                    temp.options.push({
                        name: element.name,
                        value: element.alias
                    });
                    $scope.typePersonFields[element.alias] = element.fields ?? [];
                });
                $scope.typePersonHtml = generateFieldHTML(temp);

            });
            getTypeSport().then(function (data) {
                $scope.typeSport = data;
                console.log("typeSport", data);
                let temp = {
                    name: "Type Sport",
                    alias: "typeSport",
                    type: "select",
                    options: [],
                }
                data.forEach(element => {
                    temp.options.push({
                        name: element.name,
                        value: element.alias
                    });
                    $scope.typeSportFields[element.alias] = element.fields ?? [];
                });
                $scope.typeSportHtml = $sce.trustAsHtml(generateFieldHTML(temp));

                $timeout(function () {
                    activeHref(sideitem.link);
                    $('[data-toggle="tooltip"]').tooltip()
                    delSpin(true);
                });
            });
        }

        if (!sideitem.delegations && !sideitem.typePerson) {

            $timeout(function () {
                activeHref(sideitem.link);
                $('[data-toggle="tooltip"]').tooltip()
                delSpin(true);
            });
        }
    });

    //CRUD - Update
    newModule.controller(`${sideitem.segment}EditController`, function ($scope, $rootScope, $location, $http, $timeout, UserService, $sce, $routeParams) {
        $rootScope.title = `${title} - Editar ${sideitem.name}`;
        $rootScope.sidebar = $sidebar;
        $rootScope.types = $types;
        $scope.h1 = `Editar ${sideitem.name}`;
        $scope.segment = sideitem.segment;
        $scope.event = $event;
        $scope.token = token;
        $scope.rols = $rols;
        $rootScope.user = UserService.getUser();
        $scope.datos = {};

        let datosId = $routeParams.datosId;
        $scope.id = datosId;

        $scope.generateFieldHTML = function (field, other = null) {
            return generateFieldHTML(field, other);
        };

        addSpin("h1");
        // Resto del código del controlador...
        $http({
            method: 'POST',
            url: 'api/' + sideitem.segment + '/' + datosId,
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
                $scope.datos = response.data.answer;

                if (!response.data.answer.fields && sideitem.fields) {
                    $scope.datos.fields = [];
                }
                if (!response.data.answer.fieldsResult && sideitem.fieldsResult) {
                    $scope.datos.fieldsResult = [];
                }
                if (sideitem.delegations) {
                    $scope.selectedOptions = response.data.answer.delegation ?? [];
                }
                if (response.data.answer.date) {
                    $scope.datos.date = new Date(parseInt(response.data.answer.date.$date.$numberLong));
                }
            })
            .catch(function (response) {
                delSpin(false);
                showAlert("danger", response.data.error);
                console.error(response.data);
            })
            .finally(function () {
                $timeout(function () {
                    activeHref(sideitem.link);
                    delSpin(true);
                    $('#imageModal').on('show.bs.modal', function (event) {
                        var imageUrl = $(event.relatedTarget).attr('href');
                        $(this).find('img').attr('src', imageUrl);
                        $(this).find('a').attr('href', imageUrl);
                    });
                    // $(document).select2({
                    //     theme: 'bootstrap-5'
                    // });
                });
            });

        $scope.genAlias = function () {
            // if ($scope.datos && $scope.datos.name) {
            //     // Obtener el nombre del evento desde el modelo
            //     var nombre = $scope.datos.name;

            //     // Reemplazar espacios con guiones y convertir a minúsculas
            //     var alias = nombre.replace(/\s+/g, '-').toLowerCase();

            //     // Asignar el resultado al modelo del Slug
            //     $scope.datos.alias = alias;
            // } else {
            //     $scope.datos.alias = '';
            // }
        };

        if (sideitem.fields || sideitem.fieldsResult) {
            $scope.datos.fields = [];
            $scope.datos.fieldsResult = [];
        }

        if (sideitem.fields) {
            $scope.addCampo = function () {
                $scope.datos.fields.push({
                    name: '',
                    alias: ''
                    // Otros campos que necesites
                });
                $timeout(function () {
                    $('[data-toggle="tooltip"]').tooltip();
                });
            };

            $scope.removeCampo = function (index) {
                $scope.datos.fields.splice(index, 1);
            };

            $scope.addOption = function (campoIndex) {
                var campo = $scope.datos.fields[campoIndex];

                if (!campo.options) {
                    campo.options = [];
                }
                campo.options.push({ name: '', value: '' });

                $timeout(function () {
                    $('[data-toggle="tooltip"]').tooltip();
                });
            };

            $scope.removeOption = function (campo, index) {
                campo.options.splice(index, 1);
            };
        }

        if (sideitem.fieldsResult) {
            $scope.addCampoResult = function () {
                $scope.datos.fieldsResult.push({
                    name: '',
                    alias: ''
                    // Otros campos que necesites
                });
                $timeout(function () {
                    $('[data-toggle="tooltip"]').tooltip();
                });
            };

            $scope.removeCampoResult = function (index) {
                $scope.datos.fieldsResult.splice(index, 1);
            };

            $scope.addOptionResult = function (campoIndex) {
                var campo = $scope.datos.fieldsResult[campoIndex];

                if (!campo.options) {
                    campo.options = [];
                }
                campo.options.push({ name: '', value: '' });

                $timeout(function () {
                    $('[data-toggle="tooltip"]').tooltip();
                });
            };

            $scope.removeOptionResult = function (campo, index) {
                campo.options.splice(index, 1);
            };
        }

        $scope.selectedOptions = [];

        $scope.ordenSelectOption = function (selected) {

            // Filtrar el array de opciones seleccionadas para eliminar las deseleccionadas
            $scope.selectedOptions = $scope.selectedOptions.filter(option => selected.includes(option));

            // Agregar las opciones seleccionadas que no estén en el array
            selected.forEach(option => {
                if (!$scope.selectedOptions.includes(option)) {
                    $scope.selectedOptions.push(option);
                }
            });

            // Puedes usar $scope.selectedOptions como desees.
            // console.log($scope.selectedOptions);
        };

        $scope.submitEvent = function () {

            let $formData = new FormData($("#Form")[0]);

            if (sideitem.fields) {
                $formData.append('fields', []);
                $scope.datos.fields.forEach(function (campo, i) {
                    $formData.append('fields[' + i + '][name]', campo.name);
                    $formData.append('fields[' + i + '][alias]', campo.alias);
                    $formData.append('fields[' + i + '][icon]', campo.icon);
                    $formData.append('fields[' + i + '][type]', campo.type);
                    if (campo.type == "select") {
                        campo.options.forEach(function (option, j) {
                            $formData.append('fields[' + i + '][options][' + j + '][name]', option.name);
                            $formData.append('fields[' + i + '][options][' + j + '][value]', option.value);
                        });
                    }
                });
            }
            if (sideitem.delegations) {
                $formData.append('delegation', []);
                $scope.selectedOptions.forEach(function (campo, i) {
                    $formData.append('delegation[' + i + ']', campo);
                });
            }
            if (sideitem.fieldsResult) {
                $formData.append('fieldsResult', []);
                $scope.datos.fieldsResult.forEach(function (campo, i) {
                    $formData.append('fieldsResult[' + i + '][name]', campo.name);
                    $formData.append('fieldsResult[' + i + '][alias]', campo.alias);
                    $formData.append('fieldsResult[' + i + '][icon]', campo.icon);
                    $formData.append('fieldsResult[' + i + '][type]', campo.type);
                    if (campo.type == "select") {
                        campo.options.forEach(function (option, j) {
                            $formData.append('fieldsResult[' + i + '][options][' + j + '][name]', option.name);
                            $formData.append('fieldsResult[' + i + '][options][' + j + '][value]', option.value);
                        });
                    }
                });
            }
            addSpin("h1");
            $http({
                method: 'POST',
                url: 'api/update/' + sideitem.segment + '/' + datosId,
                headers: {
                    'Content-Type': undefined,
                    'Authorization': 'Basic ' + btoa(`${token}:`)
                },
                data: $formData,
                transformRequest: angular.identity
            })
                .then(function (response) {
                    console.log(response);
                    showAlert("success", "Success: Event Create Successfully");
                    $location.path('/' + sideitem.segment);
                })
                .catch(function (response) {
                    // console.error(response);
                    showAlert("danger", response.data.error);
                    delSpin(false);
                }).finally(function () {
                    $timeout(function () {
                        delSpin(true);
                    });
                })
        };

        if (sideitem.delegations) {
            $scope.datos.sport = null;
            $scope.datos.delegation = null;

            $scope.persons = [];

            $scope.delegations = [];
            $scope.typeSport = [];
            $scope.typeSportSelected = [];


            getPersons().then(function (data) {
                $scope.persons = data;
                console.log("persons", data);
            });

            getDelegations().then(function (data) {
                $scope.delegations = data;
            });

            getTypeSport().then(function (data) {
                $scope.typeSport = data;
                // $scope.typerSportSelectedFN();
                $timeout(function () {
                    activeHref(sideitem.link);
                    $('[data-toggle="tooltip"]').tooltip()
                    delSpin(true);
                });
            });

            $scope.typerSportSelectedFN = function () {
                // Haz algo con el objeto 'item' aquí
                $scope.typeSport.forEach(element => {
                    if (element.alias == $scope.datos.sport) {
                        $scope.typeSportSelected = element;
                    }
                });
                // console.log($scope.typeSportSelected);
            };

            $scope.getPersonName = function (dni) {

                // Buscar el objeto de persona en la lista original (persons) por el DNI
                var person = $scope.persons.find(function (item) {
                    return item.dni === dni;
                });

                // Obtener el nombre y apellido si se encuentra la persona
                var labelText = person ? (person.name + ' ' + person.lastname) : '';

                return labelText;
            };

        }

        if (sideitem.typePerson) {
            $scope.datos.typePerson = null;

            $scope.typePerson = {};
            $scope.typePersonHtml = "";
            $scope.typePersonFields = [];
            $scope.typeSport = {};
            $scope.typeSportHtml = {};
            $scope.typeSportFields = [];
            getTypePerson().then(function (data) {
                $scope.typePerson = data;
                console.log("typePerson", data);
                let temp = {
                    name: "Typer Person",
                    alias: "typePerson",
                    type: "select",
                    options: [],
                }
                data.forEach(element => {
                    temp.options.push({
                        name: element.name,
                        value: element.alias
                    });
                    $scope.typePersonFields[element.alias] = element.fields ?? [];
                });
                $scope.typePersonHtml = generateFieldHTML(temp);

            });
            getTypeSport().then(function (data) {
                $scope.typeSport = data;
                console.log("typeSport", data);
                let temp = {
                    name: "Type Sport",
                    alias: "typeSport",
                    type: "select",
                    options: [],
                }
                data.forEach(element => {
                    temp.options.push({
                        name: element.name,
                        value: element.alias
                    });
                    $scope.typeSportFields[element.alias] = element.fields ?? [];
                });
                $scope.typeSportHtml = $sce.trustAsHtml(generateFieldHTML(temp));

                $timeout(function () {
                    activeHref(sideitem.link);
                    $('[data-toggle="tooltip"]').tooltip()
                    delSpin(true);
                });
            });
        }

        if (!sideitem.delegations && !sideitem.typePerson) {

            $timeout(function () {
                activeHref(sideitem.link);
                $('[data-toggle="tooltip"]').tooltip()
                delSpin(true);
            });
        }

    });

});

// console.log("ACA ACA CA")
// angular.module('app-root').requires.push('root-module');
app.requires.push("root-module");
