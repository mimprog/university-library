'use server'
//export const runtime = 'nodejs';
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { hash } from "bcryptjs";
import { signIn } from "@/auth";
import { headers } from "next/headers";
import ratelimit from "@/lib/ratelimit";
import { redirect } from "next/navigation";
import { workflowClient } from "../workflow";
import config from "../config";
export const signInWithCredentials = async(params: Pick<AuthCredentials, 'email'| 'password'>) => {
    const {email, password} = params;
    const ip = (await headers()).get('x-forwarded-for') || '127.0.0.1';
    console.log(ip);
    const {success} = await ratelimit.limit(ip);
    console.log(success);
    if(!success) return redirect('/too-fast');
    try {
        const result  = await signIn('credentials', {email, password, redirect:false});
        console.log(result);
        if(result?.error) {
            return {success: false, error: result.error}
        }
        return {success: true}
    }catch(error){
        console.log('signin error');
        return {success: false, error: 'signin error'}
    }
}

export const signUp = async (params:AuthCredentials) => {
    const {fullName, email, universityId, password, universityCard} = params;
    console.log(params);

    // check if the user already exists
    const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);
    console.log(existingUser);
    console.log('-----------------------------------')
    if(existingUser.length > 0) {
        console.log('******************')
        return {success: false, error: "User already exists"};
    }

    const hashedPassword = await hash(password, 10);
    //console.log(hashedPassword);

    try {
        const insertedUser = await db.insert(users).values({
            fullName, email, universityId, password: hashedPassword, universityCard
        })
        console.log('ok');

        console.log('inserted successfully', insertedUser);

        await workflowClient.trigger({
            url: `${config.env.prodApiEndpoint}/api/workflow/onboarding`,
            body: {
                email,
                fullName
            }
        })

        await signInWithCredentials({email, password})
        return {success: true}
    }catch(error) {
        console.log(error, 'signup error');
        return {success: false, error: "Signup error"};
    }

}