require('dotenv').config()
const productSchema=require('./models/product')
const products=require('./products.json')
const connect=require('./db/connect')
const start=async()=>{
    try {
        await connect(process.env.MONGO_URL)
        await productSchema.deleteMany()
        await productSchema.create(products)
        console.log('success!!!');
        //process.exit(0) end connection with db
        //exit(0) (0)=> zero prameter means end proccess with status successflly
        process.exit(0)
    } catch (error) {
        console.log(error);
        //exit(0) (1)=> one prameter means end proccess with status failuree
        process.exit(1)
    }
}
start()