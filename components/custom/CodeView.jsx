"use client"

import React, { useContext, useEffect, useState } from 'react'
import {
    SandpackProvider,
    SandpackLayout,
    SandpackCodeEditor,
    SandpackFileExplorer,
    ExportIcon,
} from "@codesandbox/sandpack-react";
import LookupReactNext from '@/data/Lookup';
import PROMPTReactNext from '@/data/Prompt';
import LookupHTMLCSSJS from '@/data/HTML-CSS-JS/Lookup'; // HTML CSS JS Lookup
import PROMPTHTMLCSSJS from '@/data/HTML-CSS-JS/Prompt'; // HTML CSS JS Prompt
import MessagesContext from '@/context/MessagesContext';
import axios from 'axios';
import { useConvex, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useParams, useRouter } from 'next/navigation';
import { Loader2Icon, Rocket, ScreenShare } from 'lucide-react';
import UserContext from '@/context/UserContext';
import { Button } from '../ui/button';
import SandpackPreviewClient from './SandpackPreview';
import ActionContext from '@/context/ActionContext';
import { amethyst } from '@codesandbox/sandpack-themes';

const CodeView = () => {

    const { id } = useParams();
    const router = useRouter();
    const { user, setUser } = useContext(UserContext);
    const [activeTab, setactiveTab] = useState('code');
    const [files, setfiles] = useState();
    const { message, setmessage } = useContext(MessagesContext);
    const updateFiles = useMutation(api.workspace.updateFiles);
    const { action, setAction } = useContext(ActionContext);
    const [loading, setloading] = useState(false);
    const convex = useConvex();
    const updateCredits = useMutation(api.users.updateCredits);
    const [currentLookup, setCurrentLookup] = useState(LookupHTMLCSSJS); // State for dynamic Lookup
    const [currentPrompt, setCurrentPrompt] = useState(PROMPTHTMLCSSJS); // State for dynamic Prompt
    const [sandpackTemplate, setSandpackTemplate] = useState("static"); // State for Sandpack template
    const [sandpackEntry, setSandpackEntry] = useState("");
    const [sandpackRoot, setSandpackRoot] = useState("/");
    // const [sandpackEntry, setSandpackEntry] = useState("frontend/src/main.ts"); // State for Angular Sandpack entry point
    const [sandpackDependencies, setSandpackDependencies] = useState(LookupHTMLCSSJS.DEPENDANCY.frontend); // State for Sandpack dependencies

    useEffect(() => {
        fetchFiles();
    }, [id])

    useEffect(() => {
        setactiveTab('code');
    }, [action])


    useEffect(() => {
        setFramework();
    }, [])


    const handleAction = (text) => {
        setAction({
            action: text,
            timestamp: Date.now()
        })
    }


    const setFramework = async () => {
        const result = await convex.query(api.workspace.getWorkspace, {
            workspaceId: id,
        })

        if (result.messages[0].framework === "reactjs") {
            setSandpackEntry("frontend/src/index.js");
            setSandpackRoot("/frontend");
            setSandpackTemplate("react");
            setSandpackDependencies(LookupReactNext.DEPENDANCY.frontend);
        } else {
            setSandpackEntry("index.html");
            setSandpackRoot("/");
            setSandpackTemplate("static");
            setSandpackDependencies(LookupHTMLCSSJS.DEPENDANCY.frontend);
        }
    }


    const fetchFiles = async () => {
        setloading(true);
        const result = await convex.query(api.workspace.getWorkspace, {
            workspaceId: id,
        })

        const allFiles = { ...currentLookup, ...result?.Data };
        setfiles(allFiles);
        setloading(false);
    }


    useEffect(() => {
        if (message?.length > 0) {
            const lastMessage = message[message.length - 1];
            if (lastMessage.role === "user") {
                // Show spinner immediately
                setloading(true);
                setactiveTab('code');

                if (message[0].framework === "reactjs") {
                    setCurrentLookup(LookupReactNext.DEFAULT_FILE);
                    setCurrentPrompt(PROMPTReactNext.CODE_GEN_PROMPT);
                    setSandpackTemplate("react");
                    setSandpackEntry("frontend/src/index.js");
                    setSandpackDependencies(LookupReactNext.DEPENDANCY.frontend);
                } else {
                    setCurrentLookup(LookupHTMLCSSJS.DEFAULT_FILE);
                    setCurrentPrompt(PROMPTHTMLCSSJS.CODE_GEN_PROMPT);
                    setSandpackTemplate("static");
                    setSandpackEntry("index.html");
                    setSandpackDependencies(LookupHTMLCSSJS.DEPENDANCY.frontend);
                }
            }
        }
    }, [message]);


    // 2. Once all relevant states are set (including loading), call generateCode().
    useEffect(() => {
        if (
            sandpackEntry &&
            sandpackTemplate &&
            sandpackDependencies &&
            currentPrompt &&
            loading
        ) {
            generateCode();
        }
    }, [sandpackEntry, sandpackTemplate, sandpackDependencies, currentPrompt, loading]);


    const generateCode = async () => {
        setloading(true);
        try {
            console.log("message", message);
            const prompt = JSON.stringify(message) + " " + currentPrompt;
            const response = await axios.post('/api/code', { prompt });
            const AIresponse = response.data;

            const combinedFiles = {
                ...AIresponse?.frontend?.files,
                ...AIresponse?.backend?.files,
            };

            // console.log(combinedFiles);

            // Merge with the current files to retain previous code
            setfiles(prevFiles => {
                const mergedFiles = { ...prevFiles, ...combinedFiles };
                return mergedFiles;
            });

            await updateFiles({ workspaceId: id, files: combinedFiles });

            await updateCredits({ _id: user._id, credits: user.credits - 2 });
        } catch (error) {
            console.error("Error in generateCode:", error);
        } finally {
            setloading(false);
        }
    };


    const handleFullScreen = () => {
        router.push(`/Preview?workspaceId=${id}`);
    }


    return (

        <div className='px-4'>

            <div className='flex bg-gray-900 p-2 justify-between'>
                <div className='flex gap-2'>
                    <h1 className={`px-2 py-1 rounded-2xl cursor-pointer ${activeTab === 'code' ? 'bg-blue-500' : 'bg-black'}`} onClick={() => setactiveTab("code")}>Code View</h1>
                    <h1 className={`px-2 py-1 rounded-2xl cursor-pointer ${activeTab === 'preview' ? 'bg-blue-500' : 'bg-black'}`} onClick={() => setactiveTab("preview")}>Preview View</h1>
                </div>

                <div className='flex gap-2'>
                    {/* <Button variant="outline" className="bg-green-500" onClick={() => handleAction("download")}><ExportIcon /> Download</Button> */}
                    <Button variant="outline" className="bg-orange-500" onClick={handleFullScreen}><ScreenShare />Go Full Screen</Button>
                </div>
            </div>

            <div className='relative'>
                <SandpackProvider template={sandpackTemplate} theme={amethyst} root={sandpackRoot} files={files} customSetup={{
                    dependencies: sandpackDependencies,
                    entry: sandpackEntry,
                }}
                    options={{
                        externalResources: ['https://cdn.tailwindcss.com'],
                        autorun: true,
                        autoReload: true,
                        // resizablePanels: true
                    }}
                >
                    <SandpackLayout>
                        {activeTab === 'code' ?
                            <>
                                <SandpackFileExplorer style={{ height: "78vh" }} />
                                <SandpackCodeEditor
                                    showLineNumbers
                                    showTabs
                                    showRunButton
                                    showInlineErrors
                                    wrapContent
                                    closableTabs
                                    style={{ height: "78vh" }} />
                            </> :
                            <>
                                <div className="flex flex-col" style={{ height: "78vh", width: "100%" }}>
                                    <SandpackPreviewClient style={{ height: "78vh" }} options={{
                                        showNavigator: true,
                                        // showConsole: true,
                                        // showConsoleButton: true,
                                    }} />
                                    {/* <SandpackConsole style={{ height: "20vh" }} /> */}
                                </div>
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