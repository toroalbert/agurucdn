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

let webRoutes = [
    {
        path: '/',
        templateUrl: $base_url + 'web/index.html',
        // templateUrl: $base_url + 'web/appleeffect.html',
        controller: 'HomeController',
    },
    {
        path: '/sports',
        templateUrl: $base_url + 'web/sports.html',
        // templateUrl: $base_url + 'web/appleeffect.html',
        controller: 'HomeController',
    },
    {
        path: '/calendar',
        templateUrl: $base_url + 'web/calendar.html',
        // templateUrl: $base_url + 'web/appleeffect.html',
        controller: 'HomeController',
    },
    {
        path: '/match/:matchId',
        templateUrl: $base_url + 'web/match.html',
        // templateUrl: $base_url + 'web/appleeffect.html',
        controller: 'MatchController',
    },
    {
        path: '/sportday/:ALIASSport/:dayDateNumber',
        templateUrl: $base_url + 'web/day.html',
        // templateUrl: $base_url + 'web/appleeffect.html',
        controller: 'MatchController',
    },
    {
        path: '/404',
        templateUrl: $base_url + 'views/template/404.html',
        controller: 'HomeController',
    },
];


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