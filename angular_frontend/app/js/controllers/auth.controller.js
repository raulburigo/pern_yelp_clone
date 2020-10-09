(function () {
    "use strict";

    angular.module('yelpClone')
        .controller('authCtrl', authCtrl);

    authCtrl.$inject = ['$scope', '$rootScope', '$location', 'authAPI'];

    function authCtrl ($scope, $rootScope, $location, authAPI) {

        $scope.registrar = function (newuser) {
            authAPI.createUser(newuser)
                .then(function (data) {
                    if (data.userLogged) {
                        $rootScope.user = data.userLogged;
                        console.log(data.message)
                        $location.path('/');
                    } else {
                        console.log(data.errors)
                    }
                })
                .catch(function (err) {
                    console.log(err)
                });
        }

        $scope.login = function (credentials) {
            authAPI.login(credentials)
                .then(function (data) {
                    if (data.userLogged) {
                        $rootScope.user = data.userLogged;
                        console.log(data.message)
                        $location.path('/');
                    } else {
                        console.log(data.data.message)
                    }
                })
                .catch(function (err) {
                    console.log(err)
                });
        }
    }

})();