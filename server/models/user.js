const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
   email: String,
   password: String
})

/**
 * Create a module from the Schema and export it:
 * 'user' : the model name
 * userSchema : the Schema
 * 'users' : the collection in the data base that we created in mLab
 */
module.exports = mongoose.model('user', userSchema, 'users')
/* So now, we have a mongoose model that can be used to create, read, update and delete documents in the 
data base. */