
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

require('./Bank')

app.use(bodyParser.json())

const Bank = mongoose.model("bank")

const mongoUri = "mongodb+srv://cnq:BwBEis8g2BC86Zx6@cluster0.7kn4p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(mongoUri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})


mongoose.connection.on("connected",()=>{
    console.log("Connected to db")
})

mongoose.connection.on("error",(err)=>{
    console.log(err)
})
//get route
app.get('/',(req,res)=>{
    Bank.find({})
    .then(data=>{
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
   
})

//Save data route
app.post('/send-data',(req,res)=>{

   const customerData = new Bank({
    Name: req.body.Name,
    AccNo:req.body.AccNo,
    PhoneNo:req.body.PhoneNo,
    Address:req.body.Address,
    Balance:req.body.Balance,
    Picture:req.body.Picture
   })
   customerData.save()
   .then(data=>{
       res.send(data)
      console.log(data)
   }).catch(err=>{
       console.log(err)
   })
})

//delete route

app.post('/delete',(req,res)=>{
    Bank.findByIdAndRemove(req.body._id)
    .then(data=>{
        console.log(data)
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
})

//update route
app.post('/update',(req,res)=>{
    Bank.findByIdAndUpdate(req.body._id,{
        Name: req.body.Name,
        AccNo:req.body.AccNo,
        PhoneNo: req.body.PhoneNo,
           Address:req.body.Address,
           Balance:req.body.Balance,
           Picture:req.body.Picture
    })
    .then(data=>{
        console.log(data)
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
})

//deposite withdraw route
app.post('/depositeWithdraw',(req,res)=>{
    Bank.findByIdAndUpdate(req.body._id,{
        Balance:req.body.Balance
    })
    .then(data=>{
        console.log(data)
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
})

//Account transfer route
app.post('/getDetails',(req,res)=>{
    Bank.findOne({AccNo:req.body.AccNo},)
    .then(data=>{
        console.log(data)
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
   
})
app.post('/accountTransfer',(req,res)=>{
   Bank.findByIdAndUpdate(req.body._id,{
       Balance : req.body.Balance
   })
    .then(data=>{
        console.log(data)
        res.send(data)
    })
    .catch(err=>{
        console.log(err)
    })
})

//find max 
app.post('/findMax',(req,res)=>{
    Bank.find({}).sort({AccNo:-1}).limit(1)
    .then(data=>{
        console.log(data)
        res.send(data)
    })
    .catch(err=>{
        console.log(err)
    })
})

app.listen(3000,()=>{
    console.log("Server  running")
})


