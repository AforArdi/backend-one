import { transporter } from "../config/mail.js";
import { env } from "../config/env.js";

interface SendEmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  attachments?: any[];
}

export const sendEmail = async ({
  to,
  subject,
  text,
  html,
  attachments,
}: SendEmailOptions) => {
  return await transporter.sendMail({
    from: env.smtpFrom,
    to,
    subject,
    text,
    html,
    attachments,
  });
};
