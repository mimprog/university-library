import { sampleBooks } from '@/app/constants'
import { signOut } from '@/auth'
import BookList from '@/components/BookList'
import React from 'react'

const page = () => {
  return (
    <form action={async () => {
        'use server'

        await signOut()
    }}
    className='mb-10'
    >
      <button>Logout</button>

      <BookList title='borrowed-books' books={sampleBooks} />
    </form>
  )
}

export default page
