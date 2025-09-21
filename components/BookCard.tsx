import React from 'react'
import BookCover from './BookCover'
import Link from 'next/link'
import Image from 'next/image'

export default function BookCard({id, title,genre, color, cover, isLoanedBook=false}: Book) {
  return (

    <li className={`${isLoanedBook && 'w-full flex flex-col items-center'} `}>
      <Link href={`books/${id}`}>
        <BookCover coverColor={color} coverImage={cover} variant='wide' />
        <div className={`mt-4 ${!isLoanedBook && 'xs:max-w-40 max-w-28' }`}>
            <p className='book-title'>{title}</p>
            <p className='book-genre'>{genre}</p>
        </div>
        {isLoanedBook && (
            <div className=''>
                <div>
                    <Image src='/a' alt='calendar' width={18} height={18} className='object-contain'/>
                    <p className='text-light-100'>11 days left to return</p>
                    <button className='book-btn'>Download Receipt</button>
                </div>
            </div>
        )}
      </Link>
    </li>
  )
}
