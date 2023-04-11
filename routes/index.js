var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const Trip = require('../models/trips')
const { checkBody } = require('../modules/checkBody')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/trips', (req, res) => {

  if (!checkBody(req.body, ['departure', 'arrival', 'date'])) {
    res.json({ result: false, message: "Empty fields, try again." })
    return;
  }
  Trip.find({ departure: req.body.departure, arrival: req.body.arrival, date: req.body.date })
    .then(data => {
      if (data !== null) {
        res.json({ result: true, allTrips: data })
      }
      else {
        res.json({ result: false, message: 'No trip found.' })
      }
    })
})



module.exports = router;
