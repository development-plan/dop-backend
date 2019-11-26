import { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import jwtSimple from 'jwt-simple';

import jwtConfig from '../../../jwtConfig';
import userModel, { IUserModel } from '../../models/userModel';

const router = Router();

router.post('/', expressAsyncHandler(async (req, res, _) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: 'User email and password is required',
    });
  }

  userModel.findOne({ email })
    .then((user: IUserModel) => {
      if (!user.schema.methods.verifyPassword(password)) {
        return res.status(401).json({
          message: '패스워드가 잘못되었습니다.',
        });
      }

      const { id } = user;
      const token = jwtSimple.encode({ id }, jwtConfig.jwtSecret);
      return res.json({ id, token });
    })
    .catch(() => {
      return res.status(404).json({
        message: '주어진 이메일을 가진 사용자가 없습니다.',
      });
    });
}));

export default router;
