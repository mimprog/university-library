import React from 'react'

type BookCoverCariant = 'extraSmall' | 'small' | 'medium' | 'regular' | 'wide';
import Image from 'next/image';
import BookCoverSvg from './BookCoverSvg';
const variantStyles: Record <BookCoverCariant, string> = {
    extraSmall: 'book-cover_extra_small',
    small: 'book-cover_small',
    medium: 'book-cover_medium',
    regular: 'book-cover_regular',
    wide: 'book-cover_wide',
}
interface Props {
    className?: string,
    variant?: BookCoverCariant,
    coverColor: string,
    coverImage: string
}

export default function BookCover({variant='regular', className, coverColor='#012B48', coverImage='https://placehold.co/400*600.png'}: Props) {
  return (
    <div className={`${className} relative transition-all duration-300`}>
      <BookCoverSvg coverColor={coverColor}/>
      <div className='absolute z-10 ' style={{left: '12%', width: '87.5%', height: '80%'}}>
        <Image src='/any' alt='book-cover' fill className='rounded-sm object-fill' />
      </div>
    </div>
  )
}
