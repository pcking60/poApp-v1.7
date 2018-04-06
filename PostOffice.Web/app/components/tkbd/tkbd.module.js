﻿/// <reference path="/Assets/admin/libs/angular/angular.js" />
'use strict';
angular.module('postoffice.tkbd', ['postoffice.common'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('tkbds', {
                url: "/doanh-thu-tinh-luong-tkbd",
                templateUrl: "/app/components/tkbd/tkbdListView.html",
                parent: 'base',
                controller: "tkbdListController"
            }).state('tkbd_import', {
                url: "/nhap-file-giao-dich-tkbd",
                templateUrl: "/app/components/tkbd/tkbdImportListView.html",
                parent: 'base',
                controller: "tkbdImportListController"
            }).state('rank', {
                url: "/xep-hang-huy-dong",
                templateUrl: "/app/components/tkbd/tkbdRankView.html",
                parent: 'base',
                controller: "tkbdRankController"
            }).state('tkbdhistory', {
                url: "/lich-su-giao-dich-tkbd",
                templateUrl: "/app/components/tkbd/TKBDHistory.html",
                parent: 'base',
                controller: "TKBDHistoryController"
            });
    }])