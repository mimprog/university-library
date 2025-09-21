import React from 'react'
import Image from 'next/image'
import { redirect } from "next/navigation";
import { auth } from "@/auth";
const layout = async ({children}: {children: Readonly <React.ReactNode>}) => {
    const session = await auth();
    if(session) redirect('/');
    return (
    <html lang='en'>
        <body>
            <main className='auth-container'>
                <section className='auth-form'>
                    <div className='flex flex-row '>
                        <Image className='object-cover' src='icons/book-svgrepo-com.svg' alt='logox' width={37} height={37}/>
                        <h1  className='text-lg font-semibold'>BookWise</h1>
                    </div>
                    <div>{children}</div>
                </section>

                <section>
                    <Image
                        src='/images/library-with-books.jpg'
                        alt='auth illustration'
                        height={1000}
                        width={1000}
                        className='size-full object-cover'
                    />
                </section>
            </main>            
        </body>
    </html>

  )
}

export default layout
