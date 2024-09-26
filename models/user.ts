import {Schema, model} from 'mongoose';
import bcrypt from 'bcrypt';
import validator from "validator";

const userSchema = new Schema({
  name: { type: String, required: [true, 'Please Enter your name'], minlength: 3, maxlength: 100 },
  email: { type: String, unique: true, required: [true, 'Please Enter your email'], validate: [validator.isEmail, 'Invalid email'] },
  password: { type: String, required: [true, 'Please enter the password'], minlength: 6, maxlength: 100 },
  scopeId: { type: Schema.Types.ObjectId, ref: 'Scope', required: [true, 'Scope is required '] },
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: false, default: Date.now },
});


userSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const UserModel = model('User', userSchema);

export {  UserModel };


