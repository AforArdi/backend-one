import { Worker } from "bullmq";
import { redisConnection } from "../queues/connection.js";
import { sendEmail } from "../services/mail.service.js";

export const startEmailWorker = () => {
    const worker = new Worker("mail-queue", async (job) => {
        const { to, subject, html } = job.data;
        await sendEmail({ to, subject, html });
    }, {
        connection: redisConnection
    });


    return worker;
}