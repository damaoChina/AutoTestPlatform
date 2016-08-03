/**
 * Created by Edel on 16/3/22.
 */

var express = require("express");
var router = express.Router();
var handler = require("./server/handler.js");
var decision = require("./server/controller/decision_controller.js");

module.exports = function(app){
    app.use('/', express.static('./'));
    app.use('/static', express.static('./'));

    app.use("/getOsInfo", handler.osHandler);

    app.use("/getFileList", handler.fileHandler);

    app.use("/imageSearch", handler.imageSearch);

    router.param("list_id", function(req, res, next, id){
        req.listId = id;
        next();
    });

    router.route("/decision/type")
        .get(decision.getType);

    router.route("/cards")
        //.get(function(req, res){
        //    socketHandler.getCards(req, res, "")
        //})
        .get(function(req, res){
            handler.getCards(req, res)
        })
        .post(function(req, res){
            handler.addList(req, res);
        });

    router.route("/cards/:list_id")
        .get(function(req, res){
            handler.getCards(req, res, req.listId)
        })
        .post(function(req, res){
            handler.addCard(req, res);
        })
        .delete(function(req, res){
            handler.deleteList(req, res, req.listId);
        });

    router.route("/dots")
        .get(function(req, res){
            handler.getDots(req, res);
        })
        .post(function(req, res){
            handler.addDot(req, res);
        });

    router.param("card_id", function(req, res, next, id){
        req.cardIndex = id;
        next();
    });
    router.route("/cards/:list_id/:card_id")
        .all(function(req, res, next){
            console.log("fuck");
            next();
        })
        .delete(function(req, res){
            handler.deleteCard(req, res, req.listId, req.cardIndex);
        });

    app.use(router);

//app.use('/', express.static(__dirname + '/'));
};