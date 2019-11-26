import * as express from 'express';
import passport from 'passport';
import passportJwt from 'passport-jwt';

import jwtConfig from '../../jwtConfig';
import userModel, { IUser } from '../models/userModel';

const ExtractJwt = passportJwt.ExtractJwt;
const Strategy = passportJwt.Strategy;
const params = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtConfig.jwtSecret,
};

export default function auth() {
  const strategy: passport.Strategy = new Strategy(params, (payload, done) => {
    const user = userModel.find((u: IUser) => {
      return u.id === payload.id;
    });

    if (user) {
      return done(null, user);
    }
    return done(new Error('User not found'), null);
  });
  passport.use(strategy);

  return {
    initialize () {
      return passport.initialize();
    },
    authenticate () {
      return passport.authenticate('jwt', { session: false });
    },
  };
}

export const authMiddleware =
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const user = auth().authenticate();
    // tslint:disable-next-line:no-console
    console.log(user);
    return next();
  };
