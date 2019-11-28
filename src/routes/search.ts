import express, { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import postModel, { IPostModel } from '../models/postModel';

const router: express.IRouter = Router();

interface ISearchOptions {
  $regex: string;
  $options: string;
}

router.get('/:query', expressAsyncHandler(
  async (req: express.Request, res: express.Response, _: express.NextFunction) => {
    const query: string = req.params.query;
    const options: ISearchOptions = { $regex: `.*${query}.*`, $options: 'i' };
    const posts: any = await postModel.find({
      $or: ['title', 'content'].map(key => Object({ [key]: options })),
    });
    const answers: any[] = await postModel.find({
      $or: ['content', 'schedule.content'].map(key => Object({ [key]: options })),
    });
    let result: string[] = posts.map((post: IPostModel) => post.id);
    result = result.concat(answers.filter(answer => !result.includes(answer.id)));

    return res.json({
      result: await Promise.all(result.map(async (id) => {
        return await postModel.findById(id).select('id images');
      })),
    });
  }),
);

export default router;
