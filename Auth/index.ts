import passport from 'passport';
import LocalStrategy from 'passport-local';

import User from '../Models/UserSchema';

passport.use(new LocalStrategy.Strategy(
    async (username: any, password: any, done: any) => {
       const user = await User.findOne({ username, password }).exec();
       if (user) {
           done(null, user);
       }
       else done(null, false, { message: 'Did not find user!' });
    }
));

passport.serializeUser((user: any, done: any) => {
    done(user.id);
});

export default passport;