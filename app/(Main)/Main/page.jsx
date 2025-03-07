"use client"

import MessagesContext from '@/context/MessagesContext';
import UserContext from '@/context/UserContext';
import { ArrowRight, SidebarOpen } from 'lucide-react'
import React, { useState, useContext, useEffect } from 'react'
import Signin from '../../../components/custom/Signin';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';
import { useSidebar } from '@/components/ui/sidebar';

const Main = () => {

  const [text, setText] = useState('');
  const { message, setmessage } = useContext(MessagesContext);
  const { user, setUser } = useContext(UserContext);
  const [openDialogue, setOpenDialogue] = useState(false);
  const Workspace = useMutation(api.workspace.addWorkspace);
  const router = useRouter();
  const { toggleSidebar } = useSidebar();

  // useEffect(() => {
  //   if (!user && typeof window !== 'undefined') {
  //     const storedUser = localStorage.getItem('user');
  //     if (storedUser) {
  //       setUser(JSON.parse(storedUser));
  //     }
  //   }
  // }, [user, setUser]);


  useEffect(() => {
    if (!user && typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
    // Only run on mount
  }, []);


  const handleClick = async (prompt) => {
    if (!user || !user._id) {
      setOpenDialogue(true);
      return;
    }

    setmessage({
      role: 'user',
      prompt: prompt
    });

    const workspaceId = await Workspace({
      user: user?._id,
      messages: [{
        role: 'user',
        prompt: prompt
      }]
    });

    console.log(workspaceId);
    router.push(`/workspace/${workspaceId}`);
  }


  return (

    <div className='flex flex-col text-center w-full'>

      <div className='w-full'>
        <SidebarOpen className='bg-gray-900 hover:bg-gray-800 p-2 w-10 h-8 rounded-sm cursor-pointer' onClick={toggleSidebar}></SidebarOpen>
      </div>


      <div className='flex flex-col text-center justify-center items-center w-full h-2/3'>
        <h1 className='font-bold text-3xl'>What do you want to build ?</h1>
        <p className='text-xl mt-2'>Start typing like 'Create a blog app...'</p>

        <div className='flex items-center gap-2 mt-4 w-full h-40 max-w-xl border border-gray-300 rounded-md' style={{ backgroundColor: '#121212' }}>
          <textarea className='p-4 w-full h-full outline-none bg-transparent resize-none' placeholder='Type here...' onChange={(e) => { setText(e.target.value) }}></textarea>

          {text && <ArrowRight className='bg-blue-500 hover:bg-blue-700 p-2 w-10 h-8 rounded-sm' onClick={() => handleClick(text)}></ArrowRight>}
        </div>

        <Signin openDialogue={openDialogue} closeDialogue={() => setOpenDialogue(false)} />
      </div>
    </div>

  )
}

export default Main