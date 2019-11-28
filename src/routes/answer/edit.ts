import express, { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { authMiddleware, IAuthRequest } from '../../middlewares/auth';
import answerModel, { IAnswerPayload } from '../../models/answerModel';

const router: express.IRouter = Router();

router.use('/:answerID', authMiddleware);
router.put('/:answerID', expressAsyncHandler(
  async (req: IAuthRequest, res: express.Response, _: express.NextFunction) => {
    const answerID: string = req.params.answerID;
    const { content, schedule }: IAnswerPayload = req.body;

    await answerModel.findOneAndUpdate({ _id: answerID }, {
      content, schedule,
    });
    return res.json({});
  }),
);

export default router;
