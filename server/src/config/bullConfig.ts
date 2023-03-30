import {Queue} from "bullmq"
import { QUEUE_NAME, redisOptions } from "../constants/helpers"

// Create a queuue instance
export const sendMailQueue = new Queue(
    QUEUE_NAME.EMAIL_QUEUE,
    {
        connection: redisOptions
    }
)

export async function SendMailJob(job) {
    await sendMailQueue.add(job.type, job)
}