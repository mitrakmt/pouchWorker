let queueController = {}
let request = require('request-promise')

queueController.CRON_JOB = (req, res) => {
    let done = () => {
        setTimeout(() => {
            queueController.CRON_JOB();
        }, 86400000);
    }

    queueModel.GET_NEW_QUEUE()
        .then(queue => {
            if (queue) {

                // probably loop through the queue and either call p request for each or do one and bunch them all together
                request.post(process.env.MAILGUN_SANDBOX_SERVER + '/messages',
                    auth=("api", process.env.MAILGUN_PUBLIC_API),
                    data={"from": "The Pouch Team <team@pouch.com>",
                        "to": "Michael Mitrakos <mike.mitrakos@gmail.com>",
                        "subject": "Hello Michael Mitrakos",
                        "text": "Congratulations Michael Mitrakos, you just sent an email with Mailgun!  You are truly awesome!  You can see a record of this email in your logs: https://mailgun.com/cp/log .  You can send up to 300 emails/day from this sandbox server.  Next, you should add your own domain so you can send 10,000 emails/month for free."})
                            .then(response => {
                                res.status(200).send(response)
                            })
                            .catch(error => {
                                res.status(204).send(error)
                            })
                done()
            } else {
                done()
            }
        })
}

queueController.GET_NEW_QUEUE = () => {
    var options = {
        uri: 'localhost:8000/api/',
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true 
    }

    return request(options)
        .then(response => {
            return response
        })
        .catch(error => {
            console.log(error)
            return false
        })
}

module.exports = queueController
