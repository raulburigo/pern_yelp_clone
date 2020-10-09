(function () {
    "use strict";

    angular.module('yelpClone')
    .controller('sessionCtrl', sessionCtrl);

    sessionCtrl.$inject = ['$scope', '$rootScope', '$location'];

    function sessionCtrl ($scope, $rootScope, $location) {
        $scope.logout = function () {
            delete $rootScope.user;
            $location.path('/');
        };
    };

})();