import * as mongoose from 'mongoose';

export interface IPostPayload {
  content: string;
  images: string[];
  title: string;
}

export interface IPost extends IPostPayload, mongoose.Document {}

// tslint:disable-next-line:no-empty-interface
export interface IPostModel extends IPost {}

const postSchema = new mongoose.Schema({
  author: { type: String },
  content: { type: String, required: true },
  images: { type: [String], default: [] },
  likes: { type: Number, default: 0 },
  tags: { type: [String], default: [] },
  title: { type: String, required: true },
});

postSchema.statics.createPost = async (postPayload: IPostPayload) => {
  const newPost = new postModel(postPayload);
  const savedPost = await newPost.save();
  return savedPost.id;
};

postSchema.methods.toJSON = function () {
  const obj = this.toObject();
  obj.id = obj._id;
  ['_id', '__v'].map((key) => {
    delete obj[key];
  });
  return obj;
};

const postModel = mongoose.model<IPostModel>('Post', postSchema);

export default postModel;
