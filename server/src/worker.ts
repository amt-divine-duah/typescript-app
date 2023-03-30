import {Worker} from "bullmq"
import { sendMail } from "./utils/tasks"
import { QUEUE_NAME, redisOptions } from "./constants/helpers"

const workerHandler = async (job) => {
    console.log("Starting job:", job.name)
    sendMail(job.data)
    console.log("Finished Job: ", job.name)
    return;
}



const worker = new Worker(QUEUE_NAME.EMAIL_QUEUE, workerHandler, {
    connection: redisOptions
})

worker.on("ready", () => {
    console.log("Worker connected")
})