import express, { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import jwtSimple from 'jwt-simple';

import jwtConfig from '../../../jwtConfig';
import userModel, { IUserModel } from '../../models/userModel';

const router: express.IRouter = Router();

interface ILoginPayload {
  email: string;
  password: string;
}

router.post('/', expressAsyncHandler(async (req, res, _) => {
  const { email, password }: ILoginPayload = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: '사용자 이메일과 패스워드 값이 필요합니다.',
    });
  }

  userModel.findOne({ email })
    .then((user: IUserModel) => {
      if (!user) {
        return res.status(404).json({
          message: '주어진 이메일의 사용자가 없습니다.',
        });
      }

      if (!user.verifyPassword(password)) {
        return res.status(401).json({
          message: '패스워드가 잘못되었습니다.',
        });
      }

      const { id }: { id: string } = user;
      const token: string = jwtSimple.encode({ id }, jwtConfig.jwtSecret);
      return res.json({ id, token });
    });
}));

export default router;
