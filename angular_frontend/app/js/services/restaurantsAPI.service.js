(function () {
    "use strict";

    angular.module('yelpClone')
    .service('restaurantsAPI', function($http, constants) {
        this.getRestaurants = function () {
            return $http.get(`${constants.YELP_BASE_URL}`)
                .then(function (results) {
                    return results.data.data;
                })
                .catch(function (err) {
                    return err;
                });
        }
        this.createRestaurant = function (restaurant) {
            return $http.post(`${constants.YELP_BASE_URL}`, restaurant)
                .then(function (results) {
                    return results.data.data;
                })
                .catch(function (err) {
                    return err;
                });
        }
        this.deleteRestaurant = function (id) {
            return $http.delete(`${constants.YELP_BASE_URL}/${id}/`)
                .then(function (results) {
                    return results.data.data;
                })
                .catch(function (err) {
                    return err;
                });
        }
        this.getRestaurantById = function (id) {
            return $http.get(`${constants.YELP_BASE_URL}/${id}/`)
                .then(function (results) {
                    return results.data.data;
                })
                .catch(function (err) {
                    return err;
                });
        }
        this.updateRestaurant = function (id, data) {
            return $http.put(`${constants.YELP_BASE_URL}/${id}/`, data)
                .then(function (results) {
                    return results.data.data;
                })
                .catch(function (err) {
                    return err;
                });
        }
        this.addReview = function (id, review) {
            return $http.post(`${constants.YELP_BASE_URL}/${id}/addreview`, review)
                .then(function (results) {
                    return results.data.data;
                })
                .catch(function (err) {
                    return err;
                });
        }
    })
})();