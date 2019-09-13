const express = require('express');
const path = require('path');
const usersRouter = express.Router();
const jsonBodyParser = express.json();
const UsersService = require('./users-service');

usersRouter
    .post('/', jsonBodyParser, (req, res, next) => {
        const { password, email, full_name, landlord_tenant } = req.body;



        for (const field of ['full_name', 'email', 'password', 'landlord_tenant']) {
            if (!req.body[field])
                return res.status(400).json({
                    error: `Missing '${field}' in request body`
                })

            if (password.length < 8) {
                return res.status(400).json({
                    error: 'Password must be longer than 8 characters',
                })

            }
            // res.send('ok')
        }

        const passwordError = UsersService.validatePassword(password);

        if (passwordError) {
            return res.status(400).json({ error: passwordError });
        }

        UsersService.hasUserWithEmail(
            req.app.get('db'),
            email
        )
            .then(hasUserWithEmail => {

                if (hasUserWithEmail)
                    return res.status(400).json({ error: `Email already taken` })

                //res.send('ok')
            })


        return UsersService.hashPassword(password)
            .then(hashedPassword => {
                const newUser = {
                    email,
                    password: hashedPassword,
                    full_name,
                    landlord_tenant,

                };

                return UsersService.insertUser(req.app.get('db'), newUser)
                    .then(user => {
                        res
                            .status(201)
                            .location(path.posix.join(req.originalUrl, `/${user.id}`))
                            .json(UsersService.serializeUser(user));
                    });
            })
            .catch(next);
    })



module.exports = usersRouter; 