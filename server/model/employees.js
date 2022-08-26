const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    contactno:{
        type:Number,
        required:true
    }
    ,
    empImage:{
        type:String,
        // required:true
    }
})

module.exports = mongoose.model('employees',EmployeeSchema)