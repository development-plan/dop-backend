import * as mongoose from 'mongoose';

export interface IPostPayload {
  content: string;
  images: string[];
  tags: string[];
  title: string;
}

export interface IPost extends IPostPayload, mongoose.Document {}

export interface IPostModel extends IPost {
  id: string;
  author: string;
  created: Date;
  likes: number;
}

const postSchema = new mongoose.Schema({
  author: { type: String },
  content: { type: String, required: true },
  created: { type: Date, default: Date.now },
  images: { type: [String], default: [] },
  likes: { type: Number, default: 0 },
  tags: { type: [String], default: [] },
  title: { type: String, required: true },
});

postSchema.statics.createPost = async (postPayload: IPostPayload, authorID: string) => {
  const newPost = new postModel(postPayload);
  const savedPost = await newPost.save();
  return savedPost;
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
