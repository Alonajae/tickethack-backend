var express = require('express');
var router = express.Router();

const moment = require('moment');
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
  /*
  let date= req.body.date.replaceAll('/',' ')
  let format = date.split(' ')
  let formated= format[2]+'-'+format[1]+'-'+format[0]
*/
  Trip.find({ departure: req.body.departure, arrival: req.body.arrival })
    .then(data => {
      if (data === null) {
        res.json({ result: false, message: 'No trip found.' })
        return;
      }
      else {
        const List = []
        for (const trips of data) {
          if (moment(trips.date).format('L') == req.body.date) {
            List.push(trips)
            console.log(trips)
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



module.exports = router;
