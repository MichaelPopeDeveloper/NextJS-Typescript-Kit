import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  email: String,
  phoneNumber: Number,
  address: String,
  points: Number,
});

const User = mongoose.model('User', UserSchema);

export default User;