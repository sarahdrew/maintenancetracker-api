const xss = require('xss');
const bcrypt = require('bcryptjs');

const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;

const UsersService = {
    hasUserWithUserName(db, email) {
        return db
            .select('maintenancetracker_users')
            .where({ email })
            .first()
            .then(user => !!user);
    },

    insertUser(db, newUser) {
        return db
            .insert(newUser)
            .into('maintenancetracker_users')
            .returning('*')
            .then(([user]) => user);
    },
    //password
    validatePassword(password) {
        if (password.length < 8) {
            return 'Password must be longer than 8 characters';
        }


        if (password.startsWith(' ') || password.endsWith(' ')) {
            return 'Password must not start or end with empty spaces';
        }
        if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
            return 'Password must contain 1 lowercase, uppercase, number and a special character';
        }

        return null;
    },

    hashPassword(password) {
        return bcrypt.hash(password, 12);
    },

    serializeUser(user) {
        return {
            id: user.id,
            full_name: xss(user.full_name),
            email: xss(user.email),
            date_created: user.date_created
        };
    },

};

module.exports = UsersService;