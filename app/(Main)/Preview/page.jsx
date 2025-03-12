"use client";

import React, { useEffect, useState } from "react";
import { SandpackProvider, SandpackPreview } from "@codesandbox/sandpack-react";
import { useSearchParams } from "next/navigation";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";

const page = () => {

    const searchParams = useSearchParams();
    const workspaceId = searchParams.get("workspaceId");

    const convex = useConvex();
    const [files, setFiles] = useState({});
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (!workspaceId) return;
        fetchFiles(workspaceId);
    }, [workspaceId]);


    const fetchFiles = async (id) => {
        setLoading(true);
        try {
            // 1) Query Convex for the workspace
            const result = await convex.query(api.workspace.getWorkspace, {
                workspaceId: id,
            });
            // 2) The backend might return something like { Data: { ...files }, messages: [...] }
            //    so adapt as needed:
            const fetchedFiles = result?.Data || {};
            setFiles(fetchedFiles);
        } catch (error) {
            console.error("Failed to fetch files:", error);
        } finally {
            setLoading(false);
        }
    }


    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white" style={{ width: "100vw" }}>
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 border-4 border-blue-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 border-4 border-transparent border-t-orange-500 rounded-full animate-spin-fast"></div>
                </div>
                <p className="mt-4 text-lg font-semibold animate-pulse">Loading workspace...</p>
            </div>
        );
    }


    return (

        <div style={{ width: "100vw", height: "100vh" }}>
            <SandpackProvider
                template="static"
                files={files}
            >
                <SandpackPreview
                    style={{ width: "100%", height: "100vh" }}
                    showNavigator
                />
            </SandpackProvider>
        </div>

    );

}

export default page