var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const Trip = require('../models/trips')
const { checkBody } = require('../modules/checkBody')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/trips', (req, res) => {
  if(!req.body.departure || !req.body.arrival || !req.body.date){
    res.json({result: false, message: 'Empty fields, please try again.'})
    return; 
  }
  Trip.find({departure: req.body.departure, arrival: req.body.arrival, date: req.body.date})
  .then(data => {
    if (data !== null){
    res.json({result: true, allTrips: data})}
    else {
      res.json({result: false, message: 'No trip found.'})
    }
  })
})



module.exports = router;
