const express = require('express');
const router = express.Router();
const Emoloyee = require('../controllers/Employee');
const Books = require('../controllers/Books');
const {Login ,GetTable} = require('../controllers/services');

router.post('/login',Login);
router.get('/tasks',Emoloyee.GetTasks);
router.post('/addCategory',Books.AddCategory); 
router.post('/addCaloumn',Books.AddColumn); 
router.post('/addShelf',Books.AddShelf); 
router.get('/getvalues/:table_name',GetTable); 
router.put('/tasks', Emoloyee.FixBook);
router.post('/addCopyBook',Books.AddCopyBook);
router.post('/addAuther',Books.AddAuther);
router.post('/addBook', Books.AddBook);
router.post('/addemployee',Emoloyee.AddEmployee);

module.exports = router;