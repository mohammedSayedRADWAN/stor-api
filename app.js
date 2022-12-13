require('dotenv').config();
require("express-async-errors")
const express=require('express');
const app=express()
const connect_DB=require('./db/connect')
const productsRoutes=require('./routes/products')
const errorHundeller=require('./middleware/error-handler');
const notFound=require('./middleware/not-found')
 

app.use( express.json())

app.get('/',(req,res)=>{
res.send('<h1>store api</h1><a href="api/v1/products">products routes</a>')
})
app.use('/api/v1/products',productsRoutes)

app.use(notFound)
app.use(errorHundeller)

const port=process.env.PORT || 3000
const start=async()=>{
    try {
        await connect_DB(process.env.MONGO_URL)        
        app.listen(port,()=>{
            console.log(`server is running at port ${port} ....`);
        })
    } catch (error) {
        console.log(error);
    }
}
start()