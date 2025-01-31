const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Join = require('../schemas/Join');

module.exports = () => {
    passport.use(
        new LocalStrategy(
            {
                usernameField: 'id',
                passwordField: 'password',
                passReqToCallback: false
            },
            async (id, password, done) => {
                try {
                    const exUser = await Join.findOne({id});
                    if (exUser) {
                        const result = await bcrypt.compare(password, exUser.password);
                        if (result) {
                            done(null, exUser);
                        } else {
                            done(null, false, {message: '비밀번호가 일치하지 않습니다.'});
                        }
                    } else {
                        done(null, false, {message: '가입되지 않은 회원입니다.'});
                    }
                } catch (error) {
                    console.error(error);
                    done(error);
                }
            }
        )
    );
};
