import { randomBytes } from 'crypto';
import * as mongoose from 'mongoose';

import encryptPassword from '../utils/encryptPassword';

export interface IUserPayload {
  name: string;
  nickname: string;
  email: string;
  password: string;
  tel: string;
  image: string;
}

export interface IUser extends IUserPayload, mongoose.Document {}

export interface IUserModel extends IUser {
  verifyPassword(userPassword: string): boolean;
}

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  image: { type: String, required: true },
  joined: { type: Date, default: Date.now },
  name: { type: String, required: true },
  nickname: { type: String, required: true },
  password: { type: String, required: true },
  tel: { type: String, required: true },
});

userSchema.method('toJSON', function () {
  const obj = this.toObject();
  obj.id = obj._id;
  ['_id', '__v', 'password'].map((key) => {
    delete obj[key];
  });
  return obj;
});

userSchema.pre<IUser>('save', function (done) {
  if (!this.isModified('password')) {
    return done();
  }
  const salt = randomBytes(10).toString('base64');
  const encryptedPassword = encryptPassword(this.password, salt);
  this.password = `${encryptedPassword}|${salt}`;
  return done();
});

userSchema.statics.createUser = async (userPayload: IUserPayload) => {
  const newUser = new userModel(userPayload);
  const savedUser = await newUser.save();
  return savedUser.id;
};

userSchema.methods.verifyPassword = function (userPassword: string) {
  const [encrypted, salt] = this.password.split('|');
  const password = encryptPassword(userPassword, salt);
  return (password === encrypted);
};

const userModel = mongoose.model<IUserModel>('User', userSchema);

export default userModel;
