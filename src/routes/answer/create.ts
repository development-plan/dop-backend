import express, { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { authMiddleware, IAuthRequest } from '../../middlewares/auth';
import answerModel, { IAnswerPayload } from '../../models/answerModel';

const router: express.IRouter = Router();

router.use('/:postID', authMiddleware);
router.post('/:postID', expressAsyncHandler(
  async (req: IAuthRequest, res: express.Response, _: express.NextFunction) => {
    const postID: string = req.params.postID;
    const { id: authorID }: { id: string } = req.identity;
    const { body: answer }: { body: IAnswerPayload } = req;

    const { id }: { id: string }
      = await answerModel.schema.statics.createAnswer(answer, authorID, postID);
    return res.json({ id });
  }),
);

export default router;
