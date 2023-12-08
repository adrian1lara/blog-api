
const mongoose = require('mongoose');

const { MONGO_USER, MONGO_PASS, MONGO_DB } = process.env;

const mongo_uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.uq02s3f.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority`

exports.connect = () => {
  //Connecting to the database
  try {

    mongoose.connect(mongo_uri)

  } catch (error) {
    console.log('database connection failed')
    console.error(error)
  }
}
