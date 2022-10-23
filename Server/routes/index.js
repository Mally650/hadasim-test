const express = require('express');
const router = express.Router();
const customers = require('./Customer');
const books= require('./Books');
const employee = require('./Employee');
const patient= require('./Patient');

router.get('/', (req, res) => {
    res.send('wellcome and well health')
})
router.use('/customer', customers);
router.use('/book', books);
router.use('/employee', employee);
router.use('/patient', patient);


module.exports = router;