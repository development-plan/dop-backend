import express, { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { authMiddleware, IAuthRequest } from '../../middlewares/auth';
import answerModel from '../../models/answerModel';

const router: express.IRouter = Router();

router.use('/:answerID', authMiddleware);
router.delete('/:answerID', expressAsyncHandler(
  async (req: IAuthRequest, res: express.Response, _: express.NextFunction) => {
    const id: string = req.params.answerID;
    await answerModel.findByIdAndDelete(id);
    return res.json({});
  }),
);

export default router;
