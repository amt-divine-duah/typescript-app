import {Worker} from "bullmq"
import { sendConfirmationEmail } from "./utils/tasks"
import { QUEUE_NAME, redisOptions } from "./constants/helpers"

const workerHandler = async (job) => {
    console.log("Starting job:", job.name)
    sendConfirmationEmail(job.data)
    console.log("Finished Job: ", job.name)
    return;
}



const worker = new Worker(QUEUE_NAME.EMAIL_CONFIRMATION_QUEUE, workerHandler, {
    connection: redisOptions
})

