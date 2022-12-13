const mongoose = require('mongoose')

const connectDB = (url) => {
  return mongoose.connect('mongodb+srv://medo:GXuiZg7kDSz6X2D@cluster0.1px9r18.mongodb.net/0-4storeAPI?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
}

module.exports = connectDB
