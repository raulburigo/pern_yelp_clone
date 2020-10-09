(function () {
    "use strict";

    angular.module('yelpClone')
    .service('authAPI', function($http, constants) {
        this.createUser = function (newuser) {
            return $http.post(`${constants.AUTH_BASE_URL}/register/`, newuser)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (err) {
                    return err;
                });
        }
        this.login = function (credentials) {
            return $http.post(`${constants.AUTH_BASE_URL}/login/`, credentials)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (err) {
                    return err;
                });
        }
    })
})();