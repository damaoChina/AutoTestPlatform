/**
 * Created by Edel on 16/1/30.
 */
var api = angular.module('api', []);

api.service('mail', util.getParam(function ($http) {
    this.init = function (cb) {
        $http.get("./getmail").success(function (data) {
            cb(data);
        });
    };
}));

api.service('file', util.getParam(function ($http) {
    this.getFileList = function (dir, action, cb) {
        var option = {
            "dir": dir,
            "action": action
        };
        $http.post("./getFileList", option)
            .success(function (data) {
                cb(data);
            });
    };
}));

api.service('os', util.getParam(function ($http, $timeout) {
    var t;
    var getInfo = function (cb) {
        $http.get("./getOsInfo").success(function (data) {
            cb(data);
            //t = $timeout(getInfo(cb), 100000);
        });
    };

    this.refreshInfo = function (cb) {
        //t = $timeout(getInfo(cb), 100000);
        getInfo(cb);
    };
}));

api.service('http', util.getParam(function ($http) {
    this.imageSearch = function (url, cb) {
        $http.post("./imageSearch", url).success(function (data) {
            cb(data);
        });
    }
}));

api.service("todo", util.getParam(function ($http) {
    this.getAllCards = function (cb) {
        $http.get("./cards")
            .success(function (data) {
                cb(data);
            });
    };

    this.addCardByList = function (listId, cardContent, cb) {
        var obj = {
            "listId" : listId,
            "content" : cardContent
        };
        $http.post("./cards/" + listId, obj)
            .success(function(data){
                console.log(data);
                cb(data);
            });
    };
    this.updateCardName = function(){};
    this.deleteCard = function(listId, cardIndex, cb){
        $http.delete("./cards/" + listId + "/" + cardIndex)
            .success(function(res){
                console.log(res);
                cb(res);
            });
    };

    this.addList = function (con, cb) {
        var obj = {
            name : con,
            cards : []
        };
        $http.post("./cards", obj)
            .success(function(data){
                console.log(data);
                cb(data);
            })
    };
    this.updateListName = function(){};
    this.deleteList = function(listId, cb){
        $http.delete("./cards/" + listId)
            .success(function(data){
                console.log(data);
                cb(data);
            });
    };
}));