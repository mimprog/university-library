import React from 'react'
import BookOverwiew from '@/components/BookOverwiew';
import BookList from '@/components/BookList';
import { sampleBooks } from '../constants';
import { db } from '@/database/drizzle';
import { users } from '@/database/schema';
export default async function Home() {
  //const result = await db.select().from(users);
  //console.log(JSON.stringify(result, null, 2));
  return (
    < > 
     <BookOverwiew {...sampleBooks[0]}/>
     <BookList title='Latest books' books ={sampleBooks} containerClassName="mt-28" /> 
    </>
  )
}
