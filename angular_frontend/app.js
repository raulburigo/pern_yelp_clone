(function () {
    "use strict";

    // CRIA MÓDULO
    angular.module('yelpClone', []);

    // CRIA CONTROLLER DENTRO DO MÓDULO
    angular.module('yelpClone')
        .controller('yelpCloneCtrl', yelpCloneCtrl);

    yelpCloneCtrl.$inject = ['$scope', '$http'];

    function yelpCloneCtrl ($scope, $http) {
        $scope.teste = "hello world";

        $scope.newRestaurant = {
            price_range: 'Price Range'
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
            window.location.href = `/restaurants/${id}/update`
        };

        $scope.detail = function (id) {
            window.location.href = `/restaurants/${id}`
        };

        $scope.getRestaurants()
    }
})();