import {Client as WorkflowClient } from '@upstash/workflow';
import config from './config';
import {Client as QstashClient, resend} from '@upstash/qstash';


export const workflowClient = new WorkflowClient({
    baseUrl: config.env.upstash.qstashUrl!,
    token: config.env.upstash.qstashToken!
})

const qstashClient = new QstashClient({
    token: config.env.upstash.qstashToken
})

const provider = resend({
  token: config.env.resendToken!,
});

export const sendEmail = async ({email, subject, message}: {email: string, subject:string, message:string}) => {
    await qstashClient.publishJSON({
        provider,
        path: '/emails',
        body: {
            from: 'Mim Prog <onboarding@resend.dev>',
            to: [email],
            subject,
            html: message
        }
    })
    console.log("QStash response:");
}

