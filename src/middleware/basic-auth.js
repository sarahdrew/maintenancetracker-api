const AuthService = require("../auth/auth-service");
const bcrypt = require("bcryptjs");

function requireAuth(req, res, next) {
    const authToken = req.get("Authorization") || "";

    let basicAuth;
    if (!authToken.toLowerCase().startsWith("basic ")) {
        return res.status(401).json({ error: "Missing basic token" });
    } else {
        basicAuth = authToken.slice(7, authToken.length);
    }
    const [tokenUserName, tokenPassword] = AuthService.parseBasicToken(
        basicAuth
    );

    if (!tokenUserName || !tokenPassword) {
        return res.status(401).json({ error: "Unauthorized request" });
    }

    AuthService.getUserwithUserName(req.app.get("db"), tokenUserName)

        .then(user => {
            if (!user) {
                return res.status(401).json({ error: "Unauthorized request" });
            }
            //add bcrypt
            return bcrypt
                .compare(tokenPassword, user.password)
                .then(passwordsMatch => {
                    if (!passwordsMatch) {
                        return res.status(401).json({ error: "Unauthorized request" });
                    }

                    req.user = user;
                    next();
                });
        })
        .catch(next);
}

module.exports = {
    requireAuth
};