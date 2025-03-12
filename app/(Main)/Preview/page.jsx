"use client";

import React, { Suspense, useEffect, useState } from "react";
import { SandpackProvider, SandpackPreview } from "@codesandbox/sandpack-react";
import { useSearchParams } from "next/navigation";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import LookupReactNext from '@/data/Lookup';
import LookupHTMLCSSJS from '@/data/HTML-CSS-JS/Lookup';

const page = () => {

    function PreviewContent() {
        const searchParams = useSearchParams();
        const workspaceId = searchParams.get("workspaceId");

        const convex = useConvex();
        const [files, setFiles] = useState({});
        const [framework, setFramework] = useState("static");
        const [entry, setEntry] = useState("");
        const [sandpackRoot, setSandpackRoot] = useState("/");
        const [loading, setLoading] = useState(false);
        const [sandpackDependencies, setSandpackDependencies] = useState(LookupHTMLCSSJS.DEPENDANCY.frontend);

        useEffect(() => {
            if (!workspaceId) return;
            fetchFiles(workspaceId);
        }, [workspaceId]);


        const fetchFiles = async (id) => {
            setLoading(true);
            try {
                const result = await convex.query(api.workspace.getWorkspace, {
                    workspaceId: id,
                });
                console.log(result);
                // The result might look like: { Data: { "/index.html": { code: "..." }, ... } }
                const fetchedFiles = result?.Data || {};
                setFiles(fetchedFiles);
                if (result.messages[0].framework === "reactjs") {
                    setFramework("react");
                    setEntry("frontend/src/index.js");
                    setSandpackDependencies(LookupReactNext.DEPENDANCY.frontend);
                } else {
                    setFramework("static");
                    setEntry("index.html");
                    setSandpackDependencies(LookupHTMLCSSJS.DEPENDANCY.frontend);
                }
            } catch (error) {
                console.error("Failed to fetch files:", error);
            } finally {
                setLoading(false);
            }
        };


        // Show a custom loading UI while fetching from Convex
        if (loading) {
            return <LoadingUI />;
        }


        // Once we have the files, render the Sandpack preview in full screen
        return (
            <div style={{ width: "100vw", height: "90vh" }}>
                <SandpackProvider template={framework} root={sandpackRoot} files={files} customSetup={{
                    entry: entry,
                    dependencies: sandpackDependencies,
                }}
                    options={{
                        externalResources: ['https://cdn.tailwindcss.com'],
                        autorun: true,
                        autoReload: true,
                        // resizablePanels: true
                    }}
                >
                    <SandpackPreview
                        style={{ width: "100%", height: "90vh" }}
                        showNavigator
                    />
                </SandpackProvider>
            </div>
        );
    }

    /**
     * A stylish loading screen using Tailwind CSS classes.
     * This appears either as a Suspense fallback or when we're
     * actively fetching data in the component.
     */
    function LoadingUI() {
        return (
            <div
                className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white"
                style={{ width: "100vw" }}
            >
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 border-4 border-blue-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 border-4 border-transparent border-t-orange-500 rounded-full animate-spin-fast"></div>
                </div>
                <p className="mt-4 text-lg font-semibold animate-pulse">
                    Loading workspace...
                </p>
            </div>
        );
    }


    return (

        // <div style={{ width: "100vw", height: "100vh" }}>
        //     <SandpackProvider
        //         template="static"
        //         files={files}
        //     >
        //         <SandpackPreview
        //             style={{ width: "100%", height: "100vh" }}
        //             showNavigator
        //         />
        //     </SandpackProvider>
        // </div>

        <Suspense fallback={<LoadingUI />}>
            <PreviewContent />
        </Suspense>

    );

}

export default page