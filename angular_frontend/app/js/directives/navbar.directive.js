angular.module('yelpClone')
    .directive('uiNavbar', function () {
        return {
            templateUrl: 'view/navbar.tpl.html',
            replace: true,
            restrict: 'E'
        }
    });