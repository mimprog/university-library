'use client';
import { ImageKitProvider, IKUpload, IKImage } from 'imagekitio-next'
import config from '@/lib/config';
import { useState, useRef } from 'react';
import Image from 'next/image';
const { env: {imagekit: {publicKey, urlEndpoint}}} = config;

const ImageUpload = ({onFileChange}: {onFileChange: (filePath: string) => void}) => {
    const [file, setFile] =useState <{filePath:string} | null>(null);
    console.log(file);
    const ikUploadRef = useRef(null);
    const authenticator = async () => {
        try {
            const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);
            console.log(response);
            if(!response.ok) {
                const errorText = await response.text();
                throw new Error(`Request failed with status ${response.status}: ${errorText}`)
            }
            const data = await response.json();
            const {signature, token, expire} = data;
            console.log(signature, token, expire);
            return {signature,token,expire}
        }catch(error) {
            throw new Error( `Authentication request failed: ${error}`);
        }
    }

    const onError = (error:any) => {
        console.log(error);
        //toast({title: 'Image uploaded failed', 'description': bad})
    }

    const onSuccess = (res:any) => {
        console.log('uploaded file: ', res);
        setFile(res);
        onFileChange(res.filePath);

        //toast({title: 'Image uploaded successfully', 'description': good})
    }
  return (
    <ImageKitProvider 
        publicKey={publicKey} urlEndpoint={urlEndpoint} 
        authenticator={authenticator}
        onError={onError} onSuccess={onSuccess}
        filename='test-upload.png'>

      <IKUpload className='hidden' ref={ikUploadRef} onError={onError} onSuccess={onSuccess} />
      <button onClick={(e) => {
        e.preventDefault();
        if(ikUploadRef.current) {
            // @ts-ignore
            ikUploadRef.current?.click();
        }
      }} className='upload-btn'>

        <Image src='/icons/upload-sign-svgrepo-com.svg' alt='upload-icon' width={37} height={37} className='object-contain'/>

        <p className='text-base text-lime-900'>Upload a File</p>

        {file && <p className='upload-filename'>{file.filePath} </p>}
      </button>
      {file && (
        <IKImage alt={file.filePath} path={file.filePath} width={500} height={500} />
      )}
    </ImageKitProvider>
  )
}

export default ImageUpload
