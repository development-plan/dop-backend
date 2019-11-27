import * as express from 'express';
import passport from 'passport';
import passportJwt, {
  ExtractJwt as NSExtractJwt,
  Strategy as CStrategy,
  StrategyOptions as IStrategyOptions,
} from 'passport-jwt';

import jwtConfig from '../../jwtConfig';
import userModel, { IUser, IUserModel } from '../models/userModel';

const ExtractJwt: typeof NSExtractJwt = passportJwt.ExtractJwt;
const Strategy: typeof CStrategy = passportJwt.Strategy;
const params: IStrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtConfig.jwtSecret,
};

export interface IAuth {
  initialize(): express.Handler;
  authenticate(): any;
}

export default function auth(): IAuth {
  const strategy: passport.Strategy = new Strategy(params, (payload, done) => {
    const user: any = userModel.find((u: IUser) => {
      return u.id === payload.id;
    });

    if (user) {
      return done(null, user);
    }
    return done(new Error('User not found'), null);
  });
  passport.use(strategy);

  return {
    initialize (): express.Handler {
      return passport.initialize();
    },
    authenticate (): any {
      return passport.authenticate('jwt', { session: false });
    },
  };
}

export interface IAuthRequest extends express.Request {
  identity: IUserModel;
}

type TAuthMiddleWare
  = (req: IAuthRequest, _: express.Response, next: express.NextFunction) => Promise<void>;

export const authMiddleware: TAuthMiddleWare
  = async (req: IAuthRequest, _: express.Response, next: express.NextFunction) => {
    const { id }: { id: string } = auth().authenticate();
    req.identity = await userModel.findById({ id });
    return next();
  };
