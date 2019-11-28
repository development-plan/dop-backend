import express, { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';

import { authMiddleware, IAuthRequest } from '../../middlewares/auth';

import answerModel from '../../models/answerModel';
import postModel, { IPostModel } from '../../models/postModel';
import userModel, { IUserModel } from '../../models/userModel';

const router: express.IRouter = Router();

// 전체 게시글 불러오기
router.use('/', authMiddleware);
router.get('/', expressAsyncHandler(
  async (req: IAuthRequest, res: express.Response, _: express.NextFunction) => {
    const posts: any = await postModel.find({});
    return res.json({
      posts: await posts.map(async (post: IPostModel) => {
        const author: IUserModel = await userModel.findById(post.author);
        const answers: any = await answerModel.find({ post: post.id });
        return { ...post, author, answers };
      }),
    });
  }),
);

// 특정 게시글 불러오기
router.use('/:postID', authMiddleware);
router.get('/:postID', expressAsyncHandler(
  async (req: IAuthRequest, res: express.Response, _: express.NextFunction) => {
    const id: string = req.params.postID;
    const post: IPostModel = await postModel.findById({ id });
    const author: IUserModel = await userModel.findById(post.author);
    const answers: any = await answerModel.find({ post: id });
    return res.json({
      post: { ...post, author, answers },
    });
  }),
);

export default router;
