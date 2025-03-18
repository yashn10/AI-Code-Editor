"use client";

import React, { Suspense, useEffect, useState } from "react";
import { SandpackProvider, SandpackPreview } from "@codesandbox/sandpack-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';


const page = () => {

    function PreviewContent() {
        const searchParams = useSearchParams();
        const wireframeId = searchParams.get("wireframeId");
        const router = useRouter();
        const convex = useConvex();
        const [code, setCode] = useState("");
        const [loading, setLoading] = useState(false);

        useEffect(() => {
            if (!wireframeId) return;
            fetchFiles(wireframeId);
        }, [wireframeId]);


        const fetchFiles = async (id) => {
            setLoading(true);
            try {
                const result = await convex.query(api.wireframeToCode.GetWireframeToCode, {
                    _id: id,
                });
                setCode(result.Data.response);
                console.log(result);

            } catch (error) {
                console.error("Failed to fetch code:", error);
            } finally {
                setLoading(false);
            }
        };


        // const handleExitFullScreen = () => {
        //     router.push(`/view-code/${wireframeId}`);
        // };


        // Show a custom loading UI while fetching from Convex
        if (loading) {
            return <LoadingUI />;
        }


        // Once we have the files, render the Sandpack preview in full screen
        return (
            <div style={{ width: "100vw", height: "100vh" }}>
                {/* <Button variant="outline" onClick={handleExitFullScreen} className="absolute top-4 left-4 z-10">
                    <ArrowLeft /> Exit Full Screen
                </Button> */}
                <SandpackProvider template="react" files={{
                    "/App.js": `${code}`
                }}
                    options={{
                        externalResources: ['https://cdn.tailwindcss.com'],
                        autorun: true,
                        autoReload: true,
                    }}
                >
                    <SandpackPreview
                        style={{ width: "100%", height: "100vh" }}
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

        <Suspense fallback={<LoadingUI />}>
            <PreviewContent />
        </Suspense>

    );

}

export default page