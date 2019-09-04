const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')

const AuthService = {
    getUserWithEmail(db, email) {
        return db('maintenancetracker_users')
            .where({ email })
            .first()
    },
    comparePasswords(password, hash) {
        return bcrypt.compare(password, hash)
    },
    createJwt(subject, payload) {
        return jwt.sign(payload, config.JWT_SECRET, {
            subject,
            expiresIn: 60 * 60 * 2,
            algorithm: 'HS256',
        })
    },
    parseBasicToken(basicAuth) {
        return Buffer.from(basicAuth, "base64")
            .toString()
            .split(":");
    },
    getUserwithEmail(db, email) {
        return db("maintenancetracker_users")
            .where({ email })
            .first();
    },
    verifyJwt(token) {
        return jwt.verify(token, config.JWT_SECRET);
    }
};

module.exports = AuthService;