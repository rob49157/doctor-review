
const mongoose= require('mongoose')

const DoctorSchema= new mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim: true,
        
        
    },
    practice:{
        type:String,
        require:true,

    },
    yearsofexperience:{
        type:Number,
        require:true

    },
    location:{
        type:String,
        require: true


    }
})

const Doctor= mongoose.model('Doctor', DoctorSchema)

module.exports=Doctor