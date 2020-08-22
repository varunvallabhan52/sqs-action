const core = require('@actions/core');
const aws = require('aws-sdk');

async function run() {
    try {
        const sqsUrl = core.getInput('sqs-url', { required: false });
        const message = core.getInput('message', { required: true });
        const params = {
            QueueUrl: sqsUrl,
            MessageBody: message,
        };

        const sqs = new aws.SQS();
        sqs.sendMessage(params, (resp, err) => {
            if (err) {
                throw err;
            } else {
                console.log(`resp ${resp}`);
            }
        })
    } catch (error) {
        core.setFailed(error.message);
    }
}

module.exports = run;

/* istanbul ignore next */
if (require.main === module) {
    run();
}