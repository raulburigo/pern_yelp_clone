(function () {
    angular.module('yelpClone')
        .constant('constants', {
            YELP_BASE_URL: 'http://localhost:3000/api/v1/restaurants',
            AUTH_BASE_URL: 'https://gitmaratonadev.stefanini.com.br/apisemanaangular/api',
            PRICE_RANGE_OPTIONS: [
                {value: 'Price Range', display: 'Price Range', disabled: true},
                {value: 1, display: '$'},
                {value: 2, display: '$$'},
                {value: 3, display: '$$$'},
                {value: 4, display: '$$$$'},
                {value: 5, display: '$$$$$'},
            ]
        });

})();
