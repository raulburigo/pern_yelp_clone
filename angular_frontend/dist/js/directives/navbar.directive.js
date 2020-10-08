angular.module('yelpClone')
    .directive('uiNavbar', function () {
        return {
            templateUrl: 'view/navbar.html',
            replace: true,
            restrict: 'E'
        }
    });