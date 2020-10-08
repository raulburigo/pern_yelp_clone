(function () {
    "use strict";

    // CRIA MÓDULO
    angular.module('yelpClone', ['ngRoute']);

    angular.module('yelpClone').config(function ($routeProvider, $locationProvider) {
        $locationProvider.hashPrefix('');

        $routeProvider
        .when('/', {
            templateUrl: 'view/list.html',
            controller:  "yelpCloneCtrl"
        })
        .when('/register', {
            templateUrl: 'view/register.html',
            controller:  "registerCtrl"
        })
        .when('/login', {
            templateUrl: 'view/login.html',
            controller:  "loginCtrl"
        })
        .when('/restaurants/:id', {
            templateUrl: 'view/detail.html',
            controller:  "detailCtrl"
        })
        .otherwise({
            redirectTo:'/404'
        });
    })

    // CRIA CONTROLLER DENTRO DO MÓDULO
    angular.module('yelpClone')
        .controller('sessionCtrl', sessionCtrl);
        
    angular.module('yelpClone')
        .controller('yelpCloneCtrl', yelpCloneCtrl);
        
    angular.module('yelpClone')
        .controller('registerCtrl', registerCtrl);

    angular.module('yelpClone')
        .controller('loginCtrl', loginCtrl);        

    angular.module('yelpClone')
        .controller('detailCtrl', detailCtrl);        

    // yelpCloneCtrl.$inject = ['$scope', '$http']; // pra que precisa dessa linha???

    function sessionCtrl ($scope, $rootScope) {
        $scope.logout = function () {
            delete $rootScope.user;
        }
    };

    function detailCtrl ($scope, $rootScope, $http, $routeParams) {
        $scope.getRestaurant = function (id) {
            $http.get(`http://localhost:3000/api/v1/restaurants/${id}`)
                .then(function (results) {
                    let restaurant = results.data.data.restaurant;
                    if (!restaurant.name) {
                        window.location.href = '#/404';
                    }
                    $scope.restaurant = restaurant;
                })
                .catch(function (err) {
                    console.log(err);
                });
        };

        $scope.addreview = function (newReview) {
            newReview.name = $rootScope.user.name;
            $http.post(`http://localhost:3000/api/v1/restaurants/${$routeParams.id}/addreview`, newReview)
                .then(function (result) {
                    $scope.restaurant.reviews.push({...result.data.data.review});
                    delete $scope.newReview
                })
                .catch(function (err) {
                    console.log(err);
                });
        };


        $scope.getRestaurant($routeParams.id);
    };

    function registerCtrl ($scope, $rootScope, $http) {

        $scope.registrar = function (newuser) {
            $http.post('https://gitmaratonadev.stefanini.com.br/apisemanaangular/api/register/', newuser)
                .then(function (result) {
                    if (!result.data.errors) {
                        $rootScope.user = result.data.userLogged;
                        window.location.href = '#/';
                    } else {
                        console.log(result.data.errors)
                    }
                })
                .catch(function (err) {
                    console.log(err)
                });
        }
    }

    function loginCtrl ($scope, $rootScope, $http) {
        $scope.login = function (credentials) {
            $http.post('https://gitmaratonadev.stefanini.com.br/apisemanaangular/api/login/', credentials)
                .then(function (result) {
                $rootScope.user = result.data.userLogged;
                window.location.href = '#/';
                })
                .catch(function (err) {
                    console.log(err)
                });
        };
    }

    function yelpCloneCtrl ($scope, $http) {
        $scope.newRestaurant = {
            price_range: 'Price Range'
        };

        $scope.testar = function (teste) {
            console.log(teste)
        };

        $scope.restaurants = [];
        
        $scope.getRestaurants = function () {
            $http.get('http://localhost:3000/api/v1/restaurants/')
                .then(function (results) {
                    $scope.restaurants = results.data.data.restaurants;
                })
                .catch(function (err) {
                    console.log(err);
                });
        };

        $scope.handleSubmitBtn = function (newRestaurant) {
            $http.post('http://localhost:3000/api/v1/restaurants/', newRestaurant)
            .then(function (result) {
                let restaurant = result.data.data.restaurant
                $scope.restaurants.push({
                    ...restaurant,
                    avg_rating: null,
                    count: 0
                });
            })
            .catch(function (err) {
                console.log(err);
            });
            $scope.newRestaurant = {
                price_range: 'Price Range' // DRY!!
            };
        };

        $scope.handleDeleteBtn = function (restaurants, id) {
            $http.delete(`http://localhost:3000/api/v1/restaurants/${id}/`)
                .then(function (results) {
                    console.log('deletado ', results);
                    $scope.restaurants = restaurants.filter(function (restaurant) {
                        if (restaurant.id !== id) {
                            return restaurant.id !== id
                        };
                    });
                })
                .catch(function (err) {
                    console.log(err);
                });
        };

        $scope.handleUpdateBtn = function (id) {
            console.log('link para update ', id);
            window.location.href = `#/restaurants/${id}/update`
        };

        $scope.detail = function (id) {
            window.location.href = `#/restaurants/${id}`
        };

        $scope.getRestaurants()
    }
})();