﻿(function (app) {
    app.controller('transactionAddController', transactionAddController);
    transactionAddController.$inject = ['authService', '$scope', 'apiService', 'notificationService', '$state', 'commonService', '$stateParams', '$ngBootbox', '$timeout'];
    function transactionAddController(authService, $scope, apiService, notificationService, $state, commonService, $stateParams, $ngBootbox, $timeout) {
        $scope.transaction = {
            Status: true,
            IsCash: true,
            IsCurrency: false,
            Users: null,
            Service: null,            
            TransactionDate: null,
            UserId: null,
            Properties: [],
            TransactionDetails: [],
            Services: []
        }

        //check role 
        $scope.isManager = authService.haveRole('Manager');
        $scope.isAdmin = authService.haveRole('Administrator');
        $scope.days = 31;
        if ($scope.isAdmin) {
            $scope.days = 365;
        }
        if ($scope.isManager) {
            $scope.days = 60;
        }

        $(function () {
            $('#datetimepicker1').datetimepicker({
                maxDate: moment(),
                minDate: moment().subtract($scope.days, 'day'),

            });
        });

        $scope.getListUser = getListUser;
        $scope.AddTransaction = AddTransaction;
        function AddTransaction() {
            $scope.transaction.ServiceId = $scope.transaction.Service.ID;           
            $scope.transaction.TransactionDate = $("#datetimepicker1").find("input").val();
            
            const ACCEPTABLE_OFFSET = 2678400 * 1000 * 2;
            if ((new Date().getTime() - new Date($scope.transaction.TransactionDate).getTime()) > ACCEPTABLE_OFFSET)
            {
                notificationService.displayError('Ngày giao dịch đã chậm quá 30 ngày');
            }
            else
            {
                $scope.transaction.TransactionDetails = [];
                $scope.transaction.Properties.forEach(function (item, index) {                   
                    $scope.transaction.TransactionDetails.push({
                        Money: item.Money,
                        PropertyServiceId: item.ID,
                        Status: true,
                        TransactionId: -1
                    });
                });                
                // trong cái này mình đã chứa đủ dữ liệu rồi 
                apiService.post('/api/transactions/create', $scope.transaction,
                    function (result) {
                        notificationService.displaySuccess('Giao dịch thành công');
                        $timeout(function () {
                            $ngBootbox.confirm('Bạn có muốn tiếp tục nhập?').then(function () {
                                $scope.transaction.TransactionDetails = [];
                                $state.go($state.current, {}, { reload: true });
                            }
                            , function () {
                                $state.go('transactions', {}, { reload: true });
                                //$state.reload();                        
                            });
                        }, 500);

                    }, function (error) {
                        notificationService.displayError('Giao dịch thất bại');
                    });
            }            
        }
        $scope.onSelectCallback = function (item, model) {
            $stateParams.id = item.ID;
            loadServiceDetail();
            getPropertyServices();
        };

        onSelectStaffCallback = function ($item, $model) {
            $stateParams.id = item.Id;
        }

        function getPropertyServices() {
            apiService.get('/api/property_services/getbyserviceid/' + $stateParams.id, null, function (result) {
                $scope.transaction.Properties = result.data;

            }, function (error) {
                notificationService.displayError(error.data)
            });
        }

        function loadServiceDetail() {
            apiService.get('/api/service/getbyid/' + $stateParams.id, null, function (result) {
                $scope.transaction.Service = result.data;
                $scope.transaction.Service.Name = result.data.ID;
            }, function (error) {
                notificationService.displayError(error.data)
            });
        }

        function loadServices() {
            apiService.get('/api/service/getallparents', null, function (result) {
                $scope.transaction.Services = result.data
            }, function (error) {
                notificationService.displayError(error.data)
            });
        }
        var dateTo = new Date();

        function getListUser() {
            apiService.get('/api/po/getbycurrentuser',
                null,
                function (response) {
                    apiService.get('/api/applicationUser/getuserbypoid/' + response.data.ID,
                        null,
                        function (response) {
                            $scope.transaction.Users = response.data;
                        }, function (response) {
                            notificationService.displayError('Không tải được danh sách nhân viên.');
                        });
                },
                function (response) {
                    notificationService.displayError('Không tải được thông tin nhân viên.');
                });          
        }

        loadServiceDetail();
        getPropertyServices();
        getListUser();
        //loadServices();       
    }
})(angular.module('postoffice.transactions'));