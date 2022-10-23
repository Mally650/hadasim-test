const express = require('express');
const app = express();
const api = require('./routes')
const bodyParser = require('body-parser');
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(bodyParser.json()); 
app.get('/', (req, res) => {
    res.send('you in the APP')
})
app.use(cors(corsOptions)) // Use this after the variable declaration
app.use('/api', api);

app.listen(3003);