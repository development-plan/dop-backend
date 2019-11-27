import express, { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { authMiddleware, IAuthRequest } from '../../middlewares/auth';
import postModel, { IPostModel } from '../../models/postModel';

const router: express.IRouter = Router();

// 전체 게시글 불러오기
router.use('/', authMiddleware);
router.get('/', expressAsyncHandler(
  async (req: IAuthRequest, res: express.Response, _: express.NextFunction) => {
    const posts = await postModel.find({});
    return posts;
  }),
);

// 특정 게시글 불러오기
router.use('/:postID', authMiddleware);
router.get('/:postID', expressAsyncHandler(
  async (req: IAuthRequest, res: express.Response, _: express.NextFunction) => {
    const post: IPostModel = await postModel.findById({ id });
  }),
);

export default router;
