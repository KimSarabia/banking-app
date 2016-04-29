'use strict';

var app = angular.module("myApp");

app.service('bankService', function($http) {
    this.currentTrans = [];
    this.currentTransactionList = [];
    this.transactionRange=0;

    this.getAll = () => {
        $http.get('/transactions').then(res => {
            this.allTs = res.data;
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    };

    this.getById = (id) => {
        $http.get(`/transactions/transaction/${id}`).then(res => {
            this.currentTrans = res.data;
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    };

    this.create = (newTransaction) => {
        $http.post('/transactions', newTransaction).then(res => {
            console.log("success");
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    };

    this.getType = () => {
        $http.get('/transactions/types').then(res => {
            console.log(res);
            this.types = res.data;
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    };

    this.getName = () => {
        $http.get('/transactions/names').then(res => {
            console.log(res);
            this.names = res.data;
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    };

    this.update = (editTransaction) => {
        $http.put(`/transactions/${editTransaction.id}`, editTransaction).then(res => {
            console.log("success");
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    };

    this.getByType = (type) => {
        $http.get(`/transactions/type/${type}`).then(res => {
            this.currentTransactionList = res.data;
            this.transactionRange = res.data.length;
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    };

    this.getByName = (name) => {
        $http.get(`/transactions/name/${name}`).then(res => {
            this.currentTransactionList = res.data;
            this.transactionRange = res.data.length;
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    };

    this.deleteTransaction = function(transaction) {
        $http.delete(`/transactions/${transaction.id}`).then(res => {
            console.log("Successfully deleted");
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    };

});
