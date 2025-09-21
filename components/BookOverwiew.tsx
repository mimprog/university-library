import React from 'react'
import Image from 'next/image'
import BookCover from './BookCover'
import { Button } from './ui/button'

export default function BookOverwiew({title, author, genre, rating, total_copies, available_copies, color, description,cover}: Book) {
  return (
    <section className='book-overview'>

      <div className='flex flex-1 flex-col gap-5'>
        <h1 className='text-4xl text-cyan-900 font-bold'>{title}</h1>

        <div className='book-info'>
          
            <p>
                By <span className='font-semibold text-light-200'>{author}</span>
            </p> 

            <p>
                Category {''} 
                <span className='font-semibold text-light-200'>{genre}</span>
            </p> 

          <div className='flex flex-row gap-1'>
              <Image src='/icons/library-svgrepo-com.svg' alt='icons' width={12} height={22} />
              <p>{rating}</p>
          </div>
        
        </div>
      

      <div className='book-copies'>

        <p>
            Total Books <span>{total_copies}</span>
        </p>

        <p>
            Available Books <span>{available_copies}</span>
        </p>
      </div>

      <p className='book-description'>{description}</p>

      <Button className=' my-2'>
        <Image src={cover} alt='' width={20} height={20}/>
        <p className='font-medium text-xl text-dark-400'>Borrow</p>
      </Button>
    </div>

      <div className='relative flex flex-1 justify-center'>
        <div className='relative'>
            <div className='absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden'>
                 <BookCover variant='wide' className='z-10' coverColor={color} coverImage={cover}/>
            </div>
            <div className='absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden'>
                 <BookCover variant='wide' className='z-10' coverColor={color} coverImage={cover}/>
            </div>
        </div>
      </div>
    
    </section>
  )
}
