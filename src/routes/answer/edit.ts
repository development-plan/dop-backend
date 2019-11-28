import express, { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { authMiddleware, IAuthRequest } from '../../middlewares/auth';
import answerModel, { IAnswerModel } from '../../models/answerModel';

const router: express.IRouter = Router();

router.use('/:answerID', authMiddleware);
router.put('/:answerID', expressAsyncHandler(
  async (req: IAuthRequest, res: express.Response, _: express.NextFunction) => {
    const answerID: string = req.params.answerID;
    return res.json({});
  }),
);

export default router;
