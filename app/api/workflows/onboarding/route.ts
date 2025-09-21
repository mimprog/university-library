import {serve} from '@upstash/workflow/nextjs';
import { duration } from 'drizzle-orm/gel-core';

type InitialData = {
    email: string;
}

/*export const {POST} = serve <InitialData>(routeFunction: async (context)) => {
    const {email} = context.requestPayload;

    await context.run(stepName: 'new-signup', stepFunction: async () => {
        await sendEmail(message:'Welcome to the platform', email);
    });

    await context.sleep('wait-for-3-days', duration: 60*60*24*2 );

    while(true) {
        const state = await context.run(stepName: 'check-user-state', stepFunction: async() => {
            return await getUserState();
        })

        if(state === 'non-active') {
            //
        }


    }
}*/

async function sendEmail(message:string, email: string) {
    console.log(`Sending ${message} email to ${email}`);
}



type UserState = 'non-active' | 'active';

const getUserState = async(): Promise<UserState> => {
    return 'non-active';
}