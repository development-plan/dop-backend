import { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { keys } from 'ts-transformer-keys';

import userModel, { IUser } from '../../models/userModel';

const router = Router();

router.post('/', expressAsyncHandler(async (req, res, _) => {
  const user = req.body;

  // validation
  const userKeys = keys<IUser>();
  userKeys.map((key) => {
    if (!Object(user).hasOwnProperty(key)) {
      return res.status(400).json({
        message: `Field '${key}' required`,
      });
    }
  });

  // create user
  try {
    const id = await userModel.schema.statics.createUser(user);
    return res.json({ id });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}));

export default router;
