import express, { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { authMiddleware, IAuthRequest } from '../../middlewares/auth';
import postModel, { IPostPayload } from '../../models/postModel';

const router = Router();

router.use('/', authMiddleware);
router.post('/', expressAsyncHandler(
  async (req: IAuthRequest, res: express.Response, _: express.NextFunction) => {
    const { id: authorID }: { id: string } = req.identity;
    const { body: post }: { body: IPostPayload } = req;

    const { id }: { id: string } = await postModel.schema.statics.createPost(post, authorID);
    return res.json({ id });
  }),
);

export default router;
