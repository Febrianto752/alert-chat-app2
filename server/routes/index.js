var express = require('express');
var router = express.Router();

module.exports = function (io) {
  /* GET home page. */
  router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
  });

  router.post('/alert-room1', function (req, res, next) {
    io.to("room1").emit("receiveMessage", { room: "room1", message: `ALERT ROOM 1 ` })
    res.json({ status: "ok", message: "alert room 1 sended" })
  });

  router.post('/alert-room2', function (req, res, next) {
    io.to("room2").emit("receiveMessage", { room: "room2", message: `ALERT ROOM 2` })
    res.json({ status: "ok", message: "alert room 2 sended" })
  });

  router.post('/alert-all-room', function (req, res, next) {
    io.to("room1").emit("receiveMessage", { room: "room1", message: `ALERT ALL ROOM` })
    io.to("room2").emit("receiveMessage", { room: "room2", message: `ALERT ALL ROOM` })
    res.json({ status: "ok", message: "alert all room sended" })
  });

  return router;
};
