const express = require('express');
const app = express();

const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const employeeRoute = require('./routes/employees');

app.use(cors());
app.use(bodyParser.json());
app.use('/employees',employeeRoute);

mongoose.connect('mongodb://127.0.0.1:27017/employees_details')
.then(data=>{
    console.log("Connected to mongodb Database");
}).catch(error=>{
    console.log(error);
})

// app.get("/",(req,res)=>{
//     res.send("Hello World");
// });

app.listen(8000);