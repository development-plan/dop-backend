import passport from 'passport';
import passportJwt from 'passport-jwt';

import userModel, { IUser } from '../models/userModel';
import jwtConfig from '../../jwtConfig';

const ExtractJwt = passportJwt.ExtractJwt;
const Strategy = passportJwt.Strategy;
const params = {
  secretOrKey: jwtConfig.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

export default function () {
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
