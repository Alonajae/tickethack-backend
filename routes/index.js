var express = require('express');
var router = express.Router();

const moment = require('moment');
const mongoose = require('mongoose');
const Trip = require('../models/trips');
const Cart = require('../models/carts');
const User = require('../models/users');
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

  let format = req.body.date.replaceAll('/', ' ').split(' ')
  let formated = format[1] + '/' + format[0] + '/' + format[2]

  Trip.find({ departure: { $regex: req.body.departure }, arrival: { $regex: req.body.arrival } })
    .then(data => {
      if (data === null) {
        res.json({ result: false, message: 'No trip found.' })
        return;
      }
      else {
        const List = []
        for (const trips of data) {
          if (moment(trips.date).format('L') === formated) {
            let tripsFormated = {
              departure: trips.departure,
              arrival: trips.arrival,
              date: moment(trips.date).format('LT'),
              price: trips.price
            }
            List.push(tripsFormated)
          }
        }
        if (List.length === 0) {
          res.json({ result: false, message: 'No trip found.' })
        } else {
          res.json({ result: true, allTrips: List })
        }
      }
    })
})

router.get('/cart', (req, res) => {
  Cart.find()
    .then(data => {
      if (data !== null) {
        res.json({ result: true, cart: data })
      } else {
        res.json({result: false, message: "No items in the cart yet."})
      }
    })
})



module.exports = router;
