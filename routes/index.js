var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const Trip = require('../models/trips')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/trips', (req, res) => {
  Trip.find({departure: req.body.departure, arrival: req.body.arrival, date: req.body.date})
  .then(data => {
    if (data !== null){
    res.json({result: true, allTrips: data})}
    else {
      res.json({result: false, message: 'There is no trip available for this research'})
    }
  })
})


module.exports = router;
