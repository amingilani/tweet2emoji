var express = require('express');
var router = express.Router();

module.exports = function (app) {
  app.use('/', router);
};

router.get('/dashboard', function (req, res, next) {
    res.render('dashboard');
});
