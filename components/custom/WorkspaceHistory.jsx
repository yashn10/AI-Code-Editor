"use client"

import UserContext from '@/context/UserContext';
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react'
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { useSidebar } from '../ui/sidebar';
import { Loader2Icon } from 'lucide-react';

const WorkspaceHistory = () => {

    const { user, setUser } = useContext(UserContext);
    const convex = useConvex();
    const [workspaceData, setworkspaceData] = useState();
    const [loading, setloading] = useState(false);
    const { toggleSidebar } = useSidebar();

    useEffect(() => {
        getAllWorkspaces();
    }, [user])


    const getAllWorkspaces = async () => {
        setloading(true);
        if (!user || !user._id) {
            console.warn("User not loaded yet");
            return;
        }
        const workspaces = await convex.query(api.workspace.getAllWorkspaceData, { _id: user._id });
        setworkspaceData(workspaces);
        console.log("data", workspaces);
        setloading(false);
    };


    return (

        <div className='py-2'>
            <h2 className='p-2'>
                Your Chat History
            </h2>

            <div className='h-[60vh]' style={{ overflowY: "scroll", scrollbarWidth: "none" }}>
                {loading === true ? (
                    <div className='p-5'>
                        <Loader2Icon className='animate-spin mx-auto' />
                        <h2 className='text-gray-500 text-center'>Loading Chats History</h2>
                    </div>
                ) : (
                    <div className='flex flex-col space-y-2 mt-2'>
                        {workspaceData &&
                            workspaceData[0].messages?.filter((msg) => msg.role === 'user').map((msg, index) => (
                                <div key={index}>
                                    <Link href={`/workspace/${workspaceData[0]._id}`} onClick={toggleSidebar} className='bg-gray-800 block p-2 rounded-sm text-sm text-gray-400 font-light hover:text-white cursor-pointer'>
                                        {msg.prompt}
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                )}
            </div>

        </div>
    )
}

export default WorkspaceHistory