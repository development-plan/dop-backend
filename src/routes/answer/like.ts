import express, { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { authMiddleware, IAuthRequest } from '../../middlewares/auth';
import answerModel, { IAnswerModel } from '../../models/answerModel';

const router: express.IRouter = Router();

router.use('/:answerID/like', authMiddleware);
router.post('/:answerID/like', expressAsyncHandler(
  async (req: IAuthRequest, res: express.Response, _: express.NextFunction) => {
    const answerID: string = req.params.answerID;
    const answer: IAnswerModel = await answerModel.findById(answerID);

    const { id: userID }: { id: string } = req.identity;

    await answerModel.update(
      { _id: answerID },
      {
        [answer.likes.includes(userID) ? '$pull' : '$push']: {
          likes: userID,
        },
      },
    );

    return res.json({});
  }),
);

export default router;
