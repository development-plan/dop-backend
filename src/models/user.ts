import * as mongoose from 'mongoose';
import { randomBytes } from 'crypto';

import encryptPassword from '../utils/encryptPassword';

interface IUser extends mongoose.Document {
  name: string;
  nickname: string;
  email: string;
  password: string;
  tel: string;
  image: string;
  timestamp: number;
}

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nickname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  tel: { type: String, required: true },
  image: { type: String, required: true },
  timestamp: { type: Number, default: Date.now },
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

userSchema.methods.verifyPassword = function (userPassword: string) {
  const [encrypted, salt] = this.password.split('|');
  const password = encryptPassword(userPassword, salt);
  return (password === encrypted);
};

const userModel = mongoose.model<IUser>('User', userSchema);

export default userModel;
