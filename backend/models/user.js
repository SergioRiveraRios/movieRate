import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
const { Schema } = mongoose;

const saltRounds=10
const User = new Schema({
  email:String,
  password:String,
  name: String, // String is shorthand for {type: String}
  Movies:[]
});

User.methods.encryptPassword=async(password)=>{
  return bcrypt.hash(password,saltRounds)
}

User.methods.comparePassword =function(password){
  return bcrypt.compare(password,this.password)
}

const user = mongoose.model('User', User);
export default user;