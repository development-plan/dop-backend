import { randomBytes } from 'crypto';
import mongoose, { Model, Schema } from 'mongoose';

import encryptPassword from '../utils/encryptPassword';

export interface IUserPayload {
  email: string;
  image: string;
  name: string;
  nickname: string;
  password: string;
  tel: string;
}

export interface IUser extends IUserPayload, mongoose.Document {}

export interface IUserModel extends IUser {
  id: string;
  verifyPassword(userPassword: string): boolean;
}

const userSchema: Schema = new mongoose.Schema({
  email: { type: String, required: true },
  image: { type: String, required: true },
  joined: { type: Date, default: Date.now },
  name: { type: String, required: true },
  nickname: { type: String, required: true },
  password: { type: String, required: true },
  tel: { type: String, required: true },
});

userSchema.pre<IUser>('save', function (done): any {
  if (!this.isModified('password')) {
    return done();
  }
  const salt: string = randomBytes(10).toString('base64');
  const encryptedPassword: string = encryptPassword(this.password, salt);
  this.password = `${encryptedPassword}|${salt}`;
  return done();
});

userSchema.statics.createUser = async (userPayload: IUserPayload) => {
  const newUser: IUserModel = new userModel(userPayload);
  const savedUser: IUserModel = await newUser.save();
  return savedUser.id;
};

userSchema.methods.toJSON = function (): any {
  const obj: any = this.toObject();
  obj.id = obj._id;
  ['_id', '__v', 'password'].map((key) => {
    delete obj[key];
  });
  return obj;
};

userSchema.methods.verifyPassword = function (userPassword: string): boolean {
  const [encrypted, salt] = this.password.split('|');
  const password: string = encryptPassword(userPassword, salt);
  return (password === encrypted);
};

const userModel: Model<IUserModel> = mongoose.model<IUserModel>('User', userSchema);

export default userModel;
