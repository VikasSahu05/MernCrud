const express = require('express');
const Employee = require('../model/employees');
const router = express.Router();
const multer = require('multer');


const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"../client/public/uploads/");
    },
    filename:(req,file,callback)=>{
        callback(null,file.originalname);
    }
})

const upload = multer({storage:storage});


router.get('/', (req,res)=>{
    Employee.find().then(data=>{
        res.json(data)
    }).catch(e=>{
        res.json({message : e})
    })
})

router.get("/emp/:id",(req,res)=>{
    Employee.findById(req.params.id)
    .then((article)=>res.json(article))
    .catch((err)=>res.status(400).json(`Error:${err}`));
});

router.post('/add',upload.single("empImage"),(req,res)=>{
    const employee = new Employee({
        name:req.body.name,
        age:req.body.age,
        address:req.body.address,
        contactno:req.body.contactno,
        empImage:req.file.originalname
    });
    employee.save().then(data=>{
        res.json(data)
    }).catch(e=>{
        res.json({message : e})
    })
})

router.put('/update/:id',upload.single("empImage"),(req,res)=>{
    Employee.updateOne({_id:req.params.id},{
        $set:{
            name:req.body.name,
            age:req.body.age,
            address:req.body.address,
            contactno:req.body.contactno,
            empImage:req.file.originalname
        }
    }).then(data=>{
        res.json(data)
    }).catch(e=>{
        res.json({message:e})
    })
})

router.delete('/delete/:id',(req,res)=>{
    Employee.deleteOne({_id:req.params.id})
    .then(data=>{
        res.json(data)
    }).catch(e=>{
        res.json({message:e})
    })
})

module.exports = router;