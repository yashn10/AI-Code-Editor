"use client"

import React, { useContext, useEffect, useState } from 'react'
import {
    SandpackProvider,
    SandpackLayout,
    SandpackCodeEditor,
    SandpackFileExplorer,
    ExportIcon
} from "@codesandbox/sandpack-react";
import Lookup from '@/data/Lookup';
import PROMPT from '@/data/Prompt';
import MessagesContext from '@/context/MessagesContext';
import axios from 'axios';
import { useConvex, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useParams } from 'next/navigation';
import { Loader2Icon, Rocket } from 'lucide-react';
import UserContext from '@/context/UserContext';
import { Button } from '../ui/button';
import SandpackPreviewClient from './SandpackPreview';
import ActionContext from '@/context/ActionContext';

const CodeView = () => {

    const { id } = useParams();
    const { user, setUser } = useContext(UserContext);
    const [activeTab, setactiveTab] = useState('code');
    const [files, setfiles] = useState(Lookup.DEFAULT_FILE);
    const { message, setmessage } = useContext(MessagesContext);
    const updateFiles = useMutation(api.workspace.updateFiles);
    const { action, setAction } = useContext(ActionContext);
    const [loading, setloading] = useState(false);
    const convex = useConvex();
    const updateTokens = useMutation(api.users.updateToken);

    useEffect(() => {
        fetchFiles();
    }, [id])

    useEffect(() => {
        setactiveTab('preview');
    }, [action])


    const handleAction = (text) => {
        setAction({
            action: text,
            timestamp: Date.now()
        })
    }


    const fetchFiles = async () => {
        setloading(true);
        const result = await convex.query(api.workspace.getWorkspace, {
            workspaceId: id,
        })

        const allFiles = { ...Lookup.DEFAULT_FILE, ...result?.Data };
        setfiles(allFiles);
        setloading(false);
    }


    useEffect(() => {
        if (message?.length > 0) {
            const role = message[message?.length - 1].role;
            if (role === 'user') {
                generateCode();
            }
        }
    }, [message])


    const countTokens = (text) => {
        if (typeof text !== 'string') {
            return 0;
        }
        return text.trim().split(/\s+/).length;
    }


    const generateCode = async () => {
        setloading(true);
        const prompt = JSON.stringify(message) + " " + PROMPT.CODE_GEN_PROMPT;
        const response = await axios.post('/api/code', { prompt });
        console.log("response", response);
        const AIresponse = response.data;

        const AIfiles = { ...Lookup.DEFAULT_FILE, ...AIresponse?.files }
        setfiles(AIfiles);

        await updateFiles({
            workspaceId: id,
            files: AIresponse?.files
        });

        // Use fallback for currentTokens if user.token is not a valid number.
        const currentTokens = !isNaN(Number(user.token)) ? Number(user.token) : 50000;
        const tokensUsed = countTokens(AIresponse.response); // Updated here
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

        setloading(false);
    }

    return (

        <div className='px-4'>

            <div className='flex bg-gray-900 p-2 justify-between'>
                <div className='flex gap-2'>
                    <h1 className={`px-2 py-1 rounded-2xl cursor-pointer ${activeTab === 'code' ? 'bg-blue-500' : 'bg-black'}`} onClick={() => setactiveTab("code")}>Code View</h1>
                    <h1 className={`px-2 py-1 rounded-2xl cursor-pointer ${activeTab === 'preview' ? 'bg-blue-500' : 'bg-black'}`} onClick={() => setactiveTab("preview")}>Preview View</h1>
                </div>

                <div className='flex gap-2'>
                    <Button variant="outline" className="bg-orange-500" onClick={() => handleAction("download")}><ExportIcon /> Download</Button>
                    <Button variant="outline" className="bg-green-500" onClick={() => handleAction("deploy")}><Rocket /> Deploy</Button>
                </div>
            </div>

            <div className='relative'>
                <SandpackProvider template="react" theme={"dark"} files={files} customSetup={{
                    dependencies: {
                        ...Lookup.DEPENDANCY
                    }
                }}
                    options={{
                        externalResources: ['https://cdn.tailwindcss.com']
                    }}
                >
                    <SandpackLayout>
                        {activeTab === 'code' ?
                            <>
                                <SandpackFileExplorer style={{ height: "80vh" }} />
                                <SandpackCodeEditor style={{ height: "80vh" }} />
                            </> :
                            <>
                                <SandpackPreviewClient />
                            </>
                        }
                    </SandpackLayout>
                </SandpackProvider>

                {loading && (
                    <div className="absolute inset-0 flex flex-col gap-2 items-center justify-center bg-gray-900 bg-opacity-50 z-10">
                        <Loader2Icon className="animate-spin mx-auto" />
                        <h2 className="text-white text-center">Generating your code ....</h2>
                    </div>
                )}

            </div>

        </div>

    )
}

export default CodeView