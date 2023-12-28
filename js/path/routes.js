let routes = [
    {
        path: '/login',
        templateUrl: './views/login.html',
        controller: 'LoginController',
    },
    {
        path: '/logout',
        templateUrl: './views/login.html',
        controller: 'LogOutController',
        requiresAuth: true,
    },
    {
        path: '/register',
        templateUrl: './views/register.html',
        controller: 'RegisterController',
    },
    {
        path: '/forgot-password',
        templateUrl: './views/forgot-password.html',
        controller: 'LoginController',
    },
    // {
    //     path: '/home',
    //     templateUrl: './views/home.html',
    //     controller: 'HomeController',
    //     requiresAuth: true,
    // },
    {
        path: '/404',
        templateUrl: './views/template/404.html',
        controller: 'HomeController',
    },
];

let customRoutes = [];

const templateRoutes = [
    {
        path: '/profile',
        templateUrl: './views/desing/profile.html',
        controller: 'HomeController',
        requiresAuth: true,
    },
    {
        path: '/buttons',
        templateUrl: './views/desing/buttons.html',
        controller: 'HomeController',
        requiresAuth: true,
    },
    {
        path: '/icons',
        templateUrl: './views/desing/icons.html',
        controller: 'iconsController',
        requiresAuth: true,
    },
    {
        path: '/cards',
        templateUrl: './views/desing/cards.html',
        controller: 'HomeController',
        requiresAuth: true,
    },
    {
        path: '/charts',
        templateUrl: './views/desing/charts.html',
        controller: 'HomeController',
        requiresAuth: true,
    },
    {
        path: '/tables',
        templateUrl: './views/desing/tables.html',
        controller: 'HomeController',
        requiresAuth: true,
    },
    {
        path: '/delegacion',
        templateUrl: './views/desing/delegacion.html',
        controller: 'HomeController',
        requiresAuth: true,
        requiredRoles: ['admin'],
    },
    {
        path: '/utilities-animation',
        templateUrl: './views/desing/utilities-animation.html',
        controller: 'HomeController',
        requiresAuth: true,
    },
    {
        path: '/utilities-border',
        templateUrl: './views/desing/utilities-border.html',
        controller: 'HomeController',
        requiresAuth: true,
    },
    {
        path: '/utilities-color',
        templateUrl: './views/desing/utilities-color.html',
        controller: 'HomeController',
        requiresAuth: true,
    },
    {
        path: '/utilities-other',
        templateUrl: './views/desing/utilities-other.html',
        controller: 'HomeController',
        requiresAuth: true,
    },
    {
        path: '/blank',
        templateUrl: './views/template/blank.html',
        controller: 'HomeController',
    },
]