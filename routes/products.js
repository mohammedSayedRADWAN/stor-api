const express = require("express");
const {getAllProductStatic,getAllProducts}=require('../controllers/products')
const Router=express.Router()
Router.route('/').get(getAllProducts)
Router.route('/static').get(getAllProductStatic)
module.exports=Router