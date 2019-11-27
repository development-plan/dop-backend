import { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';

import userModel, { IUser, IUserModel } from '../../models/userModel';

const router = Router();

router.post('/', expressAsyncHandler(async (req, res, _) => {
  const user = req.body;

  // validation
  const userKeys = ['name', 'nickname', 'email', 'password', 'tel', 'image'];
  userKeys.map((key) => {
    if (!Object(user).hasOwnProperty(key)) {
      return res.status(400).json({
        message: `필드 '${key}'의 값이 필요합니다.`,
      });
    }
  });

  // if already user with same email exist
  const dup: IUserModel = await userModel.findOne({ email: user.email });
  if (dup) {
    return res.status(400).json({
      message: '같은 이메일의 사용자가 이미 존재합니다.',
    });
  }

  // create user
  const id = await userModel.schema.statics.createUser(user);
  return res.json({ id });
}));

export default router;
