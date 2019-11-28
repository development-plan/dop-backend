import mongoose, { Model, Schema } from 'mongoose';

export interface ISchedulePayload {
  content: string;
  date: number;
}

export interface IAnswerPayload {
  content: string;
  schedule: ISchedulePayload[];
}

export interface IAnswer extends IAnswerPayload, mongoose.Document {}

export interface IAnswerModel extends IAnswer {
  id: string;
  author: string;
  created: Date;
  post: string;
  likes: string[];
}

const answerSchema: Schema = new mongoose.Schema({
  author: { type: String, required: true },
  content: { type: String, required: true },
  created: { type: Date, default: Date.now },
  likes: { type: [String], default: [] },
  post: { type: String, required: true },
  schedule: { type: [Object], default: [] },
});

answerSchema.statics.createAnswer
  = async (answerPayload: IAnswerPayload, authorID: string, postID: string) => {
    const newAnswer: IAnswerModel = new answerModel({
      ...answerPayload,
      ...{ author: authorID, post: postID },
    });
    const savedAnswer: IAnswerModel = await newAnswer.save();
    return savedAnswer;
  };

answerSchema.methods.toJSON = function (): any {
  const obj: any = this.toObject();
  obj.id = obj._id;
  ['_id', '__v'].map((key) => {
    delete obj[key];
  });
  return obj;
};

const answerModel: Model<IAnswerModel> = mongoose.model<IAnswerModel>('Answer', answerSchema);

export default answerModel;
