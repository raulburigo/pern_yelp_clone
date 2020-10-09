(function () {
    "use strict";

    angular.module('yelpClone')
        .config(function ($routeProvider, $locationProvider) {
            $locationProvider.hashPrefix('');

            $routeProvider
            .when('/', {
                templateUrl: 'view/list.tpl.html',
                controller:  "restaurantsCtrl",
                resolve: {
                    getRestaurants: function(restaurantsAPI) {
                        return restaurantsAPI.getRestaurants()
                    }
                }
            })
            .when('/register', {
                templateUrl: 'view/register.tpl.html',
                controller:  "authCtrl"
            })
            .when('/login', {
                templateUrl: 'view/login.tpl.html',
                controller:  "authCtrl"
            })
            .when('/restaurants/:id', {
                templateUrl: 'view/detail.tpl.html',
                controller:  "restaurantDetailCtrl",
                resolve: {
                    getRestaurant: function(restaurantsAPI, $route) {
                        return restaurantsAPI.getRestaurantById($route.current.params.id)
                    }
                }
            })
            .when('/restaurants/:id/update', {
                templateUrl: 'view/update.tpl.html',
                controller:  "restaurantUpdateCtrl",
                resolve: {
                    getRestaurant: function(restaurantsAPI, $route) {
                        return restaurantsAPI.getRestaurantById($route.current.params.id)
                    }
                }
            })        
            .otherwise({
                redirectTo:'/404'
            });
        })    
    
})();