(function (app) {
    app.controller('f04Controller', f04Controller);

    f04Controller.$inject = ['$scope', 'apiService', 'notificationService', '$filter', 'authService', '$stateParams', '$injector'];

    function f04Controller($scope, apiService, notificationService, $filter, authService, $stateParams, $injector)
    {
        $scope.loading = false;
        $scope.report = {            
            date: { startDate: moment(), endDate: moment() },           
        };       

        $scope.F04 = F04;
        function F04() {
            $scope.loading = true;
            var fromDate = $scope.report.date.startDate.format('MM/DD/YYYY');
            var toDate = $scope.report.date.endDate.format('MM/DD/YYYY');
            var config = {
                params: {
                    //mm/dd/yyyy
                    fromDate: fromDate,
                    toDate: toDate
                }
            }
            apiService.get('api/statistic/f04', config,
                function (response) {
                    if (response.status = 200) {
                        window.location.href = response.data.Message;
                        $scope.loading = false;
                    }
                },
                function (response) {
                    if (response.status == 500) {
                        notificationService.displayError('Không có dữ liệu');
                        $scope.loading = false;
                    }
                    else {
                        notificationService.displayError('Không thể tải dữ liệu');
                        $scope.loading = false;
                    }
                }
            )
        }

        //check role 
        $scope.isManager = authService.haveRole('Manager');
        $scope.isAdmin = authService.haveRole('Administrator');
        $scope.isSupport = authService.haveRole('Support');
        
    }

})(angular.module('postoffice.statistics'));