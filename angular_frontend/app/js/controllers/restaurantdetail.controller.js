(function () {
    "use strict";

    angular.module('yelpClone')
        .controller('restaurantDetailCtrl', restaurantDetailCtrl);
    
    restaurantDetailCtrl.$inject = ['$scope', 'restaurantsAPI', '$rootScope', '$location', 'getRestaurant'];

    function restaurantDetailCtrl ($scope, restaurantsAPI, $rootScope, $location, getRestaurant) {
        $scope.restaurant = getRestaurant.restaurant
        
        $scope.addreview = function (review) {
            review = {
                ...review,
                name: $rootScope.user.name
            }
            restaurantsAPI.addReview(getRestaurant.restaurant.id, review)
                .then(function (data) {
                    $scope.restaurant.reviews.push({...data.review});
                    delete $scope.newReview;
                })
                .catch(function (err) {
                    console.log(err);
                });
            };

        $scope.filled = function (rating, star) {
            if (rating >= star) {
                return true
            } else {
                return false
            }
        };

        $scope.updateBtn = function () {
            $location.path(`/restaurants/${getRestaurant.restaurant.id}/update`);
        };            

    };

})();