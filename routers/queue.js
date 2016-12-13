let queueRouter = require('express').Router()
let queueController = require('../controllers/queue')

queueRouter.route('/')
    .get(queueController.CRON_JOB)

module.exports = queueRouter