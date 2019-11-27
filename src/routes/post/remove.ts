import express, { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { authMiddleware, IAuthRequest } from '../../middlewares/auth';
import postModel from '../../models/postModel';

const router: express.IRouter = Router();

router.use('/:postID', authMiddleware);
router.delete('/:postID', expressAsyncHandler(
  async (req: IAuthRequest, res: express.Response, _: express.NextFunction) => {
    const id: string = req.params.postID;
    await postModel.findByIdAndDelete(id);
    return res.json({});
  }),
);

export default router;
