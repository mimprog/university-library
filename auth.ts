import NextAuth, {User} from 'next-auth';

import CredentialsProvider from "next-auth/providers/credentials";
import {compare} from 'bcryptjs';
import { db } from './database/drizzle';
import { users } from './database/schema';
import { eq } from 'drizzle-orm';
export const {handlers, signIn, signOut, auth} = NextAuth({
    secret: process.env.AUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
           async authorize(credentials) {
            if(!credentials?.email || !credentials.password) {
                return null
            }

            const user = await db.select().from(users).where(eq(users.email, credentials.email.toString())).limit(1);
            console.log(user);
            console.log(credentials.password.toString())
            if(user.length === 0) return null;
            const isPasswordValid = await compare(credentials.password.toString(), user[0].password);
            console.log(isPasswordValid);
            if(!isPasswordValid) return null;

            return {
                id: user[0].id.toString(),
                email: user[0].email,
                name: user[0].fullName,
            } as User;
           } 
        })      
         
    ],

    pages: {
        signIn: '/sign-in'
    },
    callbacks: {
        /*async jwt({token, user}) {
            if(user){
                token.id = user.id
                token.email = user.email
                return token
            }
        },*/

        async session({session, token, user}) {
            /*if(session.user) {
                session.user.id = token.id as string;
                session.user.name = token.name as string;
            }   */
           
            if (session.user) {
                session.user.id = user?.id ?? token.sub ?? "";
                session.user.email = user?.email ?? token.email ?? "";
                session.user.name = user?.name ?? token.name ?? "";
            }

            return session;
        },
    }

})