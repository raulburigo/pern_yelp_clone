(function () {
    "use strict";

    angular.module('yelpClone')
        .controller('restaurantsCtrl', restaurantsCtrl);
    
    restaurantsCtrl.$inject = ['$scope', 'constants', 'restaurantsAPI', 'getRestaurants'];

    function restaurantsCtrl ($scope, constants, restaurantsAPI, getRestaurants) {
        $scope.priceOptions = constants.PRICE_RANGE_OPTIONS
        
        $scope.restaurants = getRestaurants.restaurants;

        $scope.handleSubmitBtn = function (newRestaurant) {
            restaurantsAPI.createRestaurant(newRestaurant)
                .then(function (data) {
                    let restaurant = data.restaurant
                    $scope.restaurants.push({
                        ...restaurant,
                        avg_rating: null,
                        count: 0
                    });
                    delete $scope.newRestaurant
                    $scope.newRestaurant = {
                        price_range: 'Price Range' // DRY!!
                    };
                })
                .catch(function (err) {
                    console.log(err);
                });
        };

        $scope.handleDeleteBtn = function (restaurants, id) {
            restaurantsAPI.deleteRestaurant(id)
                .then(function (data) {
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

    }        
})();