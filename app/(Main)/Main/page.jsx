"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import MessagesContext from '@/context/MessagesContext';
import UserContext from '@/context/UserContext';
import { ArrowRight, SidebarOpen, Sparkles } from 'lucide-react'
import React, { useState, useContext, useEffect } from 'react'
import Signin from '../../../components/custom/Signin';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';
import { useSidebar } from '@/components/ui/sidebar';
import axios from "axios";

const Main = () => {

  const [text, setText] = useState('');
  const { message, setmessage } = useContext(MessagesContext);
  const { user, setUser } = useContext(UserContext);
  const [openDialogue, setOpenDialogue] = useState(false);
  const Workspace = useMutation(api.workspace.addWorkspace);
  const router = useRouter();
  const { toggleSidebar } = useSidebar();
  const [framework, setFramework] = useState('static');
  const [isGenerating, setIsGenerating] = useState(false);
  const [loading, setLoading] = useState();


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
    setLoading(true);

    if (!user || !user._id) {
      setOpenDialogue(true);
      return;
    }

    const newMessage = {
      role: 'user',
      prompt: prompt,
      framework: framework
    };

    setmessage(prevMessages => {
      const updatedMessages = [...prevMessages, newMessage];
      return updatedMessages;
    });

    const workspaceId = await Workspace({
      user: user?._id,
      messages: [newMessage]
    });

    router.push(`/workspace/${workspaceId}`);
    setLoading(false);
  }


  const enhancedPrompt = async () => {
    try {
      setIsGenerating(true);
      console.log("Enhancing prompt...");
      const response = await axios.post("/api/prompt", { prompt: text });
      setText(response.data.response);
    } catch (error) {
      console.error("Error enhancing prompt:", error);
    } finally {
      setIsGenerating(false);
    }
  };


  return (

    <div className='flex flex-col text-center w-full'>

      <div className='w-full'>
        <SidebarOpen className='bg-gray-900 hover:bg-gray-800 p-2 w-10 h-8 rounded-sm cursor-pointer' onClick={toggleSidebar}></SidebarOpen>
      </div>


      <div className='flex flex-col text-center justify-center items-center w-full h-2/3'>
        <h1 className='font-extrabold text-6xl tracking-tight bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-transparent bg-clip-text'>Innovate with AI</h1>
        <p className='text-xl mt-4 bg-gradient-to-r from-pink-500 to-yellow-500 text-transparent bg-clip-text'>Effortless Code Generation at Your Fingertips</p>

        <div className="flex items-center gap-2 mt-4 w-full h-40 max-w-xl border border-gray-300 rounded-md shadow-lg bg-[#121212]">
          <textarea className="p-4 w-full h-full outline-none bg-transparent resize-none text-white placeholder-gray-500" placeholder="Type something like create a fullstack blog app..." value={text} onChange={(e) => { setText(e.target.value) }}></textarea>

          {text &&
            <div className="flex flex-col items-center justify-center mr-2">
              {/* Enhance Prompt Button */}
              <div
                onClick={enhancedPrompt}
                className="relative group cursor-pointer"
              >
                {/* Animated circular button with gradient background */}
                <div className="w-12 h-12 mb-2 flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 shadow-xl transform transition duration-500 group-hover:scale-110">
                  <Sparkles className={`w-6 h-6 text-white ${isGenerating ? "animate-spin" : ""}`} />
                </div>
                {/* Tooltip that appears on hover */}
                <div className="absolute transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition duration-300 text-xs text-white font-semibold" style={{ left: "200%", top: "10%" }}>
                  Enhance Prompt with AI
                </div>
              </div>

              {/* Submit Prompt Button */}
              <div
                onClick={() => handleClick(text)}
                className="w-12 h-12 mt-2 flex items-center justify-center rounded-full bg-blue-600 shadow-xl hover:bg-blue-700 transition duration-300 transform hover:scale-105 cursor-pointer"
              >
                <ArrowRight className={`w-6 h-6 text-white ${loading ? "animate-spin" : ""}`} />
              </div>
            </div>

          }
        </div>

        <Signin openDialogue={openDialogue} closeDialogue={() => setOpenDialogue(false)} />

        <div className="flex items-center justify-center mt-5">
          <Select onValueChange={(value) => setFramework(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a framework" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Frameworks and Languages</SelectLabel>
                <SelectItem value="static">HTML CSS JS</SelectItem>
                <SelectItem value="reactjs">Nextjs/React</SelectItem>
                {/* <SelectItem value="angular">Angular</SelectItem> */}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

      </div>

    </div>

  )
}

export default Main