const express = require('express');
const router = express.Router();
const Customer = require('../controllers/Customer');
const Books = require('../controllers/Books');
const {Login , GetTable} = require('../controllers/services');

router.post('/login',Login);
router.post('/signin', Customer.Signin);
router.get('/mylendedbooks/:id',Customer.GetLendedBooks);
router.get('/mywishedbooks/:id/:index',Customer.GetWaitingBooks); 
router.post('/lend', Customer.LendBook);
router.post('/wait', Customer.WaitBook);
router.put('/returnbook', Customer.ReturnBook);
router.get('/search/:id',Customer.GetCountLendedBooks);
router.get('/getvalues/:table_name',GetTable);
router.get('/search',Books.AllBooks);
router.delete('/deletewish/:id',Customer.DeleteWish);

module.exports = router;