(function () {
    "use strict";

    angular.module('yelpClone')
        .controller('restaurantUpdateCtrl', restaurantUpdateCtrl);
    
    restaurantUpdateCtrl.$inject = ['$scope', 'constants', 'restaurantsAPI', '$location', 'getRestaurant'];

    function restaurantUpdateCtrl ($scope, constants, restaurantsAPI, $location, getRestaurant) {
        $scope.restaurant = getRestaurant.restaurant
            
        $scope.updateBtn = function () {
            $location.path(`/restaurants/${getRestaurant.restaurant.id}/update`);
        };

        $scope.priceOptions = constants.PRICE_RANGE_OPTIONS

        $scope.updateRestaurant = function (newData) {
            restaurantsAPI.updateRestaurant(getRestaurant.restaurant.id, newData)
                .then(function (data) {
                    $location.path(`/restaurants/${getRestaurant.restaurant.id}`);
                })
                .catch(function (err) {
                    console.log(err)
                })
        }

    };

})();