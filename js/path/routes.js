let routes = [
    {
        path: '/login',
        templateUrl: $base_url + 'views/login.html',
        controller: 'LoginController',
    },
    {
        path: '/logout',
        templateUrl: $base_url + 'views/login.html',
        controller: 'LogOutController',
        requiresAuth: true,
    },
    {
        path: '/register',
        templateUrl: $base_url + 'views/register.html',
        controller: 'RegisterController',
    },
    {
        path: '/forgot-password',
        templateUrl: $base_url + 'views/forgot-password.html',
        controller: 'LoginController',
    },
    // {
    //     path: '/home',
    //     templateUrl: $base_url + 'views/home.html',
    //     controller: 'HomeController',
    //     requiresAuth: true,
    // },
    {
        path: '/404',
        templateUrl: $base_url + 'views/template/404.html',
        controller: 'HomeController',
    },
];

let customRoutes = [];

const templateRoutes = [
    {
        path: '/profile',
        templateUrl: $base_url + 'views/desing/profile.html',
        controller: 'HomeController',
        requiresAuth: true,
    },
    {
        path: '/buttons',
        templateUrl: $base_url + 'views/desing/buttons.html',
        controller: 'HomeController',
        requiresAuth: true,
    },
    {
        path: '/icons',
        templateUrl: $base_url + 'views/desing/icons.html',
        controller: 'iconsController',
        requiresAuth: true,
    },
    {
        path: '/cards',
        templateUrl: $base_url + 'views/desing/cards.html',
        controller: 'HomeController',
        requiresAuth: true,
    },
    {
        path: '/charts',
        templateUrl: $base_url + 'views/desing/charts.html',
        controller: 'HomeController',
        requiresAuth: true,
    },
    {
        path: '/tables',
        templateUrl: $base_url + 'views/desing/tables.html',
        controller: 'HomeController',
        requiresAuth: true,
    },
    {
        path: '/delegacion',
        templateUrl: $base_url + 'views/desing/delegacion.html',
        controller: 'HomeController',
        requiresAuth: true,
        requiredRoles: ['admin'],
    },
    {
        path: '/utilities-animation',
        templateUrl: $base_url + 'views/desing/utilities-animation.html',
        controller: 'HomeController',
        requiresAuth: true,
    },
    {
        path: '/utilities-border',
        templateUrl: $base_url + 'views/desing/utilities-border.html',
        controller: 'HomeController',
        requiresAuth: true,
    },
    {
        path: '/utilities-color',
        templateUrl: $base_url + 'views/desing/utilities-color.html',
        controller: 'HomeController',
        requiresAuth: true,
    },
    {
        path: '/utilities-other',
        templateUrl: $base_url + 'views/desing/utilities-other.html',
        controller: 'HomeController',
        requiresAuth: true,
    },
    {
        path: '/blank',
        templateUrl: $base_url + 'views/template/blank.html',
        controller: 'HomeController',
    },
]