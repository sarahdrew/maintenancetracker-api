const path = require('path');
const express = require('express')
const xss = require('xss')
const RequestsService = require('./requests-service');
const JwtMiddleware = require('../middleware/jwt-auth');

const requestsRouter = express.Router();
const jsonParser = express.json();

const serializeRequest = request => ({
    id: request.id,
    title: request.title,
    description: request.description,
    status: request.status,
    message: request.message

})

requestsRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        RequestsService.getAllRequests(knexInstance)
            .then(requests => {

                res.json(requests.map(serializeRequest))
            })
            .catch(next)
    })
    .post(jsonParser, JwtMiddleware.requireAuth, (req, res, next) => {
        const { title, description } = req.body
        const newRequest = { title, description }


        for (const [key, value] of Object.entries(newRequest))
            if (value == null)
                return res.status(400).json({
                    error: { message: `Missing ${key} in request body` }
                })


        RequestsService.insertRequest(
            req.app.get('db'),
            newRequest
        )
            .then(request => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${request.id}`))
                    .json(serializeRequest(request))

            })
            .catch(next)
    })

requestsRouter
    .route('/:requestsId')
    .all((req, res, next) => {
        RequestsService.getById(
            req.app.get('db'),
            req.params.requestsId
        )
            .then(request => {
                if (!request) {
                    return res.status(404).json({
                        error: { message: `Request doesn't exist` }
                    })
                }
                res.request = request
                next()
            })
            .catch(next)
    })
    .get((req, res, next) => {
        res.json(serializeRequest(res.request))
    })
    .delete((req, res, next) => {
        RequestsService.deleteRequest(
            req.app.get('db'),
            req.params.request_id
        )
            .then(() => {
                res.status(204).end()
            })
            .catch(next)
    })
    .put(jsonParser, (req, res, next) => {
        const { title, description, status, message } = req.body
        const requestToUpdate = { title, description, status, message }
        requestToUpdate.id = req.params.requestsId;
        const numberOfValues = Object.values(requestToUpdate).filter(Boolean).length
        if (numberOfValues === 0)
            return res.status(400).json({
                error: {
                    message: `Request body must contain either 'title', or 'description.' `
                }
            })

        RequestsService.updateRequest(
            req.app.get('db'),
            req.params.requestsId,
            requestToUpdate
        )
            .then(numRowsAffected => {
                res
                    .status(200)
                    .json(requestToUpdate)
                    .end()
            })
            .catch(next)
    })
module.exports = requestsRouter