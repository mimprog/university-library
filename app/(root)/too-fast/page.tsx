import React from 'react'

const page = () => {
  return (
    <main className='root-container flex min-h-screen flex-col items-center justify-center'>
      <h1 className='text-4xl font-bold'>Whoa, Slow down there, too many requests</h1>
      <p className='mt-3 max-w-xl text-center text-cyan-950'>
        Looks like you &apos;ve been a little too eager
      </p>
    </main>
  )
}

export default page
