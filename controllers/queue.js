let queueController = {}

queueController.CRON_JOB = (req, res) => {
    let done = () => {
        setTimeout(() => {
            queueController.CRON_JOB();
        }, 86400000);
    }

    queueModel.GET_NEW_QUEUE()
        .then(queue => {
            if (queue) {
                //queue is not empty, send everything to mail API
                done()
            } else {
                done()
            }
        })
}

queueController.GET_NEW_QUEUE = () => {

}

module.exports = queueController
