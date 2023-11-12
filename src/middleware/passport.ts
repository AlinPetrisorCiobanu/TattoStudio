import passport from 'passport';
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import Customer from '../entities/users/customer/modelCust';
import CONFIDENCE from '../config/config';

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: CONFIDENCE.SECRETDB,
};

passport.serializeUser((customer, done) => {
    done(null, customer);
  });
  
 

const jwtStrategy = new Strategy(opts, async (payload, done) => {
    try {
        const customer = await Customer.findById(payload.id);
        if (customer) {
            return done(null, customer);
        }
        return done(null, false);
    } catch (error) {
        return done(error, false);
    }
});

 passport.deserializeUser(async (id, done) => {
    try {
      const customer = await Customer.findById(id);
      done(null, customer);
    } catch (error) {
      done(error, null);
    }
  });

export default jwtStrategy;
