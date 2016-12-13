let rootRouter = require('express').Router()
let queueRouter = require('./queue')

rootRouter.use('/queue', linkRouter)

module.exports = rootRouter
