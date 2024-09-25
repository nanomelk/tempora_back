const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Modelo de usuario

passport.use(new LocalStrategy({
    usernameField: 'email', // Define el campo usado como nombre de usuario
}, async (email, password, done) => {
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return done(null, false, { message: 'Usuario no encontrado' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return done(null, false, { message: 'Contraseña incorrecta' });
        }

        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});
