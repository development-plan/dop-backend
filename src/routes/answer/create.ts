import express, { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { authMiddleware, IAuthRequest } from '../../middlewares/auth';
import answerModel, { IAnswerModel } from '../../models/answerModel';

const router: express.IRouter = Router();

router.use('/:postID', authMiddleware);
router.post('/:postID', expressAsyncHandler(
  async (req: IAuthRequest, res: express.Response, _: express.NextFunction) => {
    const postID: string = req.params.postID;
    return res.json({});
  }),
);

export default router;
