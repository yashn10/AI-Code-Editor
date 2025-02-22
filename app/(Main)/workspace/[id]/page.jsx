"use client"

import React from 'react'
import ChatView from '@/components/custom/ChatView'
import CodeView from '@/components/custom/CodeView'

const page = () => {

  return (

    <div className='flex flex-row w-full px-8 py-2' style={{ height: "100vh" }}>

      <div className='lg:w-1/4 md:w-1/4 h-full'>
        <ChatView />
      </div>

      <div className='lg:w-3/4 md:w-3/4 h-full'>
        <CodeView />
      </div>

    </div>

  )

}

export default page