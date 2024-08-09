const passport = require('passport');
const local = require('./localStrategy');
const Join = require('../schemas/Join');

module.exports = () => {
    passport.serializeUser((user, done) => {
        console.log('serialize');
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        console.log('deserialize');
        Join.findOne({
            id
        })
            .then((user) => {
                console.log('user', user);
                done(null, user);
            })
            .catch((err) => done(err));
    });

    local();
};
