var express = require('express');
var router = express.Router();

const moment = require('moment');
const mongoose = require('mongoose');
const Cart= require('../models/carts');

router.get('/', (req, res)=> {
    Cart.find()
    .then(data => {
        res.json({result: true, allCarts: data})
    })
})

module.exports = router;