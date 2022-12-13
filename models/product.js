const mongoose=require('mongoose')
const prodcutSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required'],

    },
    price:{
        type:Number,
        required:[true,'prise is required'],
    },
    rating:{
        type:Number,
        default:4.5,
    },
    company:{
        type:String,
        enum:{
            values:['marcos','liddy','ikea','caressa',],
            message:'{VALUE} is not supported',
        },
    },
    creatAt:{
      type:Date,
      default:Date.now(),
    },
    featured:{
        type:Boolean,
        default:false,
    },
})
module.exports=mongoose.model('product',prodcutSchema)