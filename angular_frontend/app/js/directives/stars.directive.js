angular.module('yelpClone')
    .directive('starsComponent', function () {
        return {
            templateUrl: 'view/stars.tpl.html',
            replace: true,
            restrict: 'E',
            scope: {
                rating: '@',
                count: '@'
            },
            link: function ($scope) {
                
                $scope.filled = function (rating, star) {
                    if (rating >= star) {
                        return true
                    } else {
                        return false
                    }
                };
            }
        }
    });