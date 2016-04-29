'use strict';

var app = angular.module("myApp");

app.controller("mainCtrl", function($scope, $state, bankService) {
    $scope.showTransaction = false;
    $scope.showNote = false;
    console.log("controller works");
    bankService.getType();
    bankService.getName();

    $scope.getTransactions = function($this) {
        console.log($this.item);
        $scope.showTransaction = true;
        bankService.getByType($this.item.type);
        bankService.getByName($this.item.name);
    };

    //////UPDATE
    $scope.editQuest = function($this) {
        console.log($this.item);
        bankService.getByType($this.item.type);
        bankService.getByName($this.item.type);
    };

    $scope.revealNote = function(val) {
        $scope.showNote = true;
    }

    $scope.returnToHome = function() {
        $scope.showTransaction = false;
        $scope.showNote = false;
    }

    $scope.nextTransaction = function(val) {
        var curIndex = $scope.transactionsList.indexOf(val);
        console.log(val);
        if (curIndex + 1 < $scope.transactionRange) {
            $scope.showNote = false;
            $scope.trans = $scope.transactionsList[curIndex + 1];
        } else {

            console.log("No more transactions");
            $scope.showTransaction = false;
            $scope.showNote = false;
        }
    }

    $scope.$watch(function() {
        return bankService.types;
    }, function(curVal, preVal) {
        $scope.types = curVal;
    });

    $scope.$watch(function() {
        return bankService.names;
    }, function(curVal, preVal) {
        $scope.names = curVal;
    });

    $scope.$watch(function() {
        return bankService.currentTransactionList;
    }, function(curVal, preVal) {

        $scope.transactionRange = bankService.transactionRange;
        $scope.transactionsList = curVal;
        $scope.trans = curVal[0];
    });


});

app.controller("adminCtrl", function($scope, $state, bankService) {
    console.log("adminCtrl works");
    angular.element('#type').trigger('change');
    angular.element('#amount').trigger('change');
    angular.element('#name').trigger('change');
    angular.element('#date').trigger('change');
    angular.element('#note').trigger('change');
    bankService.getAll();
    $scope.modShow = false;
    $scope.allShow = true;

    $scope.$watch(function() {
        return bankService.allTs;
    }, function(curVal, preVal) {
        console.log(curVal);
        $scope.allTrans = curVal;
    });

    $scope.deleteT = function(input) {
        console.log(input.trans);
        bankService.deleteTransaction(input.trans);
        bankService.getAll();
    }

    $scope.modifyT = function(input) {
        $scope.modShow = true;
        $scope.allShow = false;
        console.log(input);
        $scope.update = input.trans;

    }

    $scope.updateT = function(input) {
        console.log(input);
        console.log(input.update.id);
        bankService.update(input.update);
        bankService.getAll();
    }

    $scope.quitUpdate = function() {
        $scope.addShow = false;
        $scope.modShow = false;
        $scope.allShow = true;
    }

    $scope.addNewTrans = function() {
        $scope.addShow = true;
        $scope.modShow = false;
        $scope.allShow = false;
        console.log($scope.newT);
    }

    $scope.addNewT = function(input) {
        bankService.create(input);
        bankService.getAll();
    }

    $scope.quitAdd = function() {
        $scope.addShow = false;
        $scope.modShow = false;
        $scope.allShow = true;
        $scope.newT = {};
    }

});
