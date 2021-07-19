const mongoose = require('mongoose')

const BankSchema = new mongoose.Schema({
    Name:String,
    AccNo:String,
    Address:String,
    PhoneNo:String,
    Balance:String,
    Picture:String

})

mongoose.model("bank",BankSchema)