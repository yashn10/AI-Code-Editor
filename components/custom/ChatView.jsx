"use client"

import MessagesContext from '@/context/MessagesContext'
import UserContext from '@/context/UserContext'
import { api } from '@/convex/_generated/api'
import { useConvex, useMutation } from 'convex/react'
import Image from 'next/image'
import { ArrowRight, Loader2Icon, SidebarCloseIcon, SidebarOpenIcon } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { useSidebar } from '../ui/sidebar'


const ChatView = () => {
  const { id } = useParams();
  const convex = useConvex();
  const [text, setText] = useState('');
  const [isAwaitingResponse, setIsAwaitingResponse] = useState(false);
  const { message, setmessage } = useContext(MessagesContext);
  const { user, setUser } = useContext(UserContext);
  const updateMessage = useMutation(api.workspace.updateWorkspace);
  const updateTokens = useMutation(api.users.updateToken);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toggleSidebar } = useSidebar();

  useEffect(() => {
    if (user) {
      getWorkspaceData();
      console.log("user", user);
    }
  }, [id, user]);


  const getWorkspaceData = async () => {
    const result = await convex.query(api.workspace.getWorkspace, { workspaceId: id });
    setmessage(result?.messages || []);
    console.log(result);
  };

  // Sends the user's message and clears the input
  const sendUserMessage = () => {
    if (!text.trim()) return;
    const userMessage = { role: 'user', prompt: text };
    setmessage((prev) => [...prev, userMessage]);
    setText('');
  };

  const countTokens = (text) => {
    return text.trim().split(/\s+/).length;
  }

  // Processes the last user message by fetching the bot's reply
  const processResponse = async () => {
    // Prevent duplicate API calls
    setIsAwaitingResponse(true);
    const lastUserMessage = message[message.length - 1];
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: lastUserMessage.prompt })
      });
      const data = await res.json();
      if (data.response) {
        const botMessage = { role: 'bot', prompt: data.response };
        setmessage((prev) => [...prev, botMessage]);
        await updateMessage({ workspaceId: id, messages: [...message, botMessage] });

        // Use fallback for currentTokens if user.token is not a valid number.
        const currentTokens = !isNaN(Number(user.token)) ? Number(user.token) : 50000;
        const tokensUsed = countTokens(botMessage.prompt);
        const remainingTokens = currentTokens - tokensUsed;

        console.log("Original token:", user.token);
        console.log("Parsed token:", currentTokens);
        console.log("Tokens used:", tokensUsed);
        console.log("Remaining tokens:", remainingTokens);

        // Update tokens in the database
        await updateTokens({
          token: remainingTokens,
          _id: user._id
        });

        setIsAwaitingResponse(false);
      } else {
        console.error("No response generated", data.error);
        setIsAwaitingResponse(false);
      }
    } catch (error) {
      console.error("Error while generating response:", error);
      setIsAwaitingResponse(false);
    } finally {
      setIsAwaitingResponse(false);
    }
  };

  // Auto-trigger bot response if the last message is from the user and no response is pending
  useEffect(() => {
    if (!isAwaitingResponse && (message || []).length > 0) {
      const lastMessage = message[message.length - 1];
      // Check if the last message is from the user; if so, process the response
      if (lastMessage.role === 'user') {
        processResponse();
      }
    }
    // We want to re-run this effect when message or isAwaitingResponse changes.
  }, [message, isAwaitingResponse]);


  const handleSidebarClick = () => {
    setSidebarOpen(!sidebarOpen);
    toggleSidebar();
  };


  return (

    <div className="mx-auto max-w-4xl p-2">
      <div className='flex items-center p-2'>
        {sidebarOpen ? <SidebarCloseIcon className='cursor-pointer' onClick={handleSidebarClick} /> : <SidebarOpenIcon className='cursor-pointer' onClick={handleSidebarClick} />}
        {/* {user && <Image src={user?.image} alt="user" width={40} height={40} className='rounded-full cursor-pointer' onClick={toggleSidebar} />} */}
        <h2 className="mb-2 text-center w-full">Your Chats</h2>
      </div>

      {/* Conversation Area */}
      <div className="bg-gray-800 rounded-lg shadow p-4 mb-6 h-[60vh] overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
        {message && message.length > 0 ? (
          message.map((msg, index) => (
            <div key={index} className="flex gap-4 items-center bg-gray-900 rounded-lg p-3 mb-2">
              {msg?.role === 'user' && (
                <Image
                  src={user?.image || '/default-profile.png'}
                  alt="profile"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              )}

              <div className="flex-1">
                <p className="text-gray-100">{msg.prompt}</p>
              </div>

              {/* Loader */}
              {isAwaitingResponse && (
                <div className="bg-gray-800 flex items-center gap-3 p-3 rounded-lg shadow mb-2">
                  <Loader2Icon className="animate-spin text-white" />
                  <p className="text-gray-200">Generating response, please wait...</p>
                </div>
              )}

            </div>
          ))
        ) : (
          <div className="text-center text-gray-400 py-10">
            No messages yet. Start the conversation!
          </div>
        )}
      </div>


      {/* Input Area */}
      <div className="flex items-center gap-3 mt-4 w-full max-w-xl mx-auto p-4 bg-gray-800 border border-blue-800 rounded-lg shadow">
        <textarea
          className="p-4 w-full h-24 outline-none bg-transparent resize-none text-gray-100 placeholder-gray-400"
          placeholder="Type here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        {text && (
          <button
            onClick={sendUserMessage}
            className="bg-blue-500 hover:bg-blue-700 p-3 rounded-lg transition-colors duration-200"
          >
            <ArrowRight className="w-6 h-6 text-white" />
          </button>
        )}
      </div>

    </div>

  );

};

export default ChatView;
