
(function () {
    angular.module('postoffice.statistics', ['postoffice.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('statistic_revenue', {
                url: "/thong-ke-doanh-thu.html",
                parent: 'base',
                templateUrl: "/app/components/statistic/revenueStatisticView.html",
                controller: "revenueStatisticController"
            })
            .state('timeStatistic', {
                url: "/thong-ke-doanh-thu-theo-thoi-gian.html",
                parent: 'base',
                templateUrl: "/app/components/statistic/timeStatisticView.html",
                controller: "timeStatisticController"
            })
            .state('f04dttl', {
                url: "/f04-doanh-thu-tinh-luong-theo-don-vi.html",
                parent: 'base',
                templateUrl: "/app/components/statistic/f04View.html",
                controller: "f04Controller"
            })
            .state('reports', {
                url: "/bao-cao-doanh-thu.html",
                parent: "base",
                templateUrl: "app/components/statistic/reportsView.html",
                controller: "reportsController"
            })
        ;
            
    }
})();