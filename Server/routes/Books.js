const express = require('express');
const router = express.Router();
const {Filter} = require('../controllers/Books');

router.get('/search',Filter);

module.exports=router;