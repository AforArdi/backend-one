import { Queue } from "bullmq";
import { redisConnection } from "./connection.js";

export const mailQueue = new Queue("mail-queue", {
    connection: redisConnection,
    defaultJobOptions: {
        attempts: 2,
        backoff: {
            type: "exponential",
            delay: 1000,
        }
    }
});

export const addMailJob = async (
    data: {
        to: string,
        subject: string,
        html: string,
    }
) => {
    await mailQueue.add("send-mail", data, {
        delay: 0,
        attempts: 2,
        backoff: {
            type: "exponential",
            delay: 1000,
        }
    })
}