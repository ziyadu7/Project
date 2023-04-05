const mongoose = require('mongoose')
const bannerSchema= mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    heading:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('banner',bannerSchema)