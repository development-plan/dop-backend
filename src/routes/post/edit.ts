import express, { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { authMiddleware, IAuthRequest } from '../../middlewares/auth';
import postModel, { IPostPayload } from '../../models/postModel';

const router: express.IRouter = Router();

router.use('/:postID', authMiddleware);
router.put('/:postID', expressAsyncHandler(
  async (req: IAuthRequest, res: express.Response, _: express.NextFunction) => {
    const id: string = req.params.postID;
    const { content, images, tags, title }: IPostPayload = req.body;

    await postModel.findOneAndUpdate({ _id: id }, {
      content, images, tags, title,
    });
    return res.json({});
  }),
);

export default router;
