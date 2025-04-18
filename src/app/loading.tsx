import Spinner from '@/components/Spinner'
import React from 'react'

function Loading() {
  return (
    <div className='h-[50vh] w-full flex items-center justify-center'><Spinner color="border-t-blue-500" /></div>
  )
}

export default Loading