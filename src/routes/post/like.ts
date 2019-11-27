import express, { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { authMiddleware, IAuthRequest } from '../../middlewares/auth';
import postModel, { IPostModel } from '../../models/postModel';

const router: express.IRouter = Router();

// toggle likes on post
router.use('/:postID/like', authMiddleware);
router.put('/:postID/like', expressAsyncHandler(
  async (req: IAuthRequest, res: express.Response, _: express.NextFunction) => {
    const postID: string = req.params.postID;
    const post: IPostModel = await postModel.findById(postID);

    const { id: userID }: { id: string } = req.identity;

    await postModel.update(
      { _id: postID },
      {
        [post.likes.includes(userID) ? '$pull' : '$push']: {
          likes: userID,
        },
      },
    );

    return res.json({});
  }),
);

export default router;
