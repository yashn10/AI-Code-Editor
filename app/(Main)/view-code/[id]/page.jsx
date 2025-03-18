"use client";

import React, { useContext, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import CodeEditor from '../_components/codeEditor';
import SelectionDetail from '../_components/selectionDetail';
import WireframecodeContext from '@/context/WireframecodeContext';
import { useConvex, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UserContext from '@/context/UserContext';

const Page = () => {

    const { id } = useParams();
    const convex = useConvex();
    const router = useRouter();
    const { user, setUser } = useContext(UserContext);
    const [generatedCode, setGeneratedCode] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { wireframecode, setWireframecode } = useContext(WireframecodeContext);
    const [codeReady, setcodeReady] = useState(false);
    const [record, setRecord] = useState(null);
    const updateWireframeCode = useMutation(api.wireframeToCode.UpdateWireframeToCode);
    const updateCredits = useMutation(api.users.updateCredits);


    useEffect(() => {
        getCodeData();
    }, [id]);


    const cleanGeneratedCode = (code) => {
        if (!code || typeof code !== 'string') return '';
        let cleaned = code.trim();
        cleaned = cleaned.replace(/^```(?:\w+)?\s*\n?/, ""); // Remove opening code fence
        cleaned = cleaned.replace(/\n?```$/, ""); // Remove closing code fence
        return cleaned;
    };


    const getCodeData = async () => {
        setLoading(true);
        try {
            const fetchedRecord = await convex.query(api.wireframeToCode.GetWireframeToCode, { _id: id });
            console.log("fetchedRecord", fetchedRecord);
            setRecord(fetchedRecord);
            if (fetchedRecord && (fetchedRecord.Data === null || fetchedRecord.Data === undefined)) {
                generateCode(fetchedRecord);
            } else {
                setGeneratedCode(fetchedRecord.Data.response);
                setcodeReady(true);
            }
        } catch (err) {
            console.error("Error fetching record:", err);
            setError(`Error fetching record: ${err.message}`);
        } finally {
            setLoading(false);
        }
    }


    const generateCode = async (data) => {
        console.log("code genrating");
        try {
            setLoading(true);
            setError(null);
            const promptToUse = data?.prompt || "Generate code based on the provided wireframe image.";
            const response = await fetch("/api/ai-code", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    model: data?.model,
                    prompt: promptToUse,
                    imageUrl: data?.imageURL,
                }),
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.statusText}`);
            }

            if (!response.body) {
                throw new Error("No response body available for streaming.");
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");
            let done = false;
            let accumulatedCode = "";

            while (!done) {
                const { value, done: doneReading } = await reader.read();
                done = doneReading;
                if (value) {
                    const chunk = decoder.decode(value, { stream: !done });
                    const lines = chunk.split("\n");
                    for (const line of lines) {
                        const trimmedLine = line.trim();
                        if (trimmedLine.startsWith("data:")) {
                            const jsonStr = trimmedLine.slice("data:".length).trim();
                            if (jsonStr === "[DONE]") continue;
                            try {
                                const parsed = JSON.parse(jsonStr);
                                const content = parsed?.choices?.[0]?.delta?.content;
                                if (content) {
                                    accumulatedCode += content;
                                    setGeneratedCode(accumulatedCode);
                                }
                            } catch (error) {
                                console.error("Error parsing SSE JSON:", error);
                            }
                        }
                    }
                }
            }

            const finalCode = cleanGeneratedCode(accumulatedCode);
            setGeneratedCode(finalCode);
            setcodeReady(true);

            // Save the generated code to Convex
            await updateWireframeCode({
                _id: id,
                Data: { response: finalCode },
            });

            await updateCredits({ _id: user._id, credits: user.credits - 1 });
        } catch (error) {
            setError(`Failed to generate code: ${error.message}`);
            console.error("Error in generateCode:", error);
        } finally {
            setLoading(false);
        }
    };


    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800 p-6">
                <div className="container mx-auto max-w-6xl p-4 rounded-xl bg-white shadow-md border border-gray-200">
                    <div className="flex items-center gap-2 text-red-500">
                        <AlertTriangle />
                        <h2 className="text-xl font-semibold">Error</h2>
                    </div>
                    <p className="mt-2 text-gray-600">{error}</p>
                    <Button onClick={() => router.push('/')} className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg">
                        Go Back
                    </Button>
                </div>
            </div>
        );
    }


    return (

        <div className="min-h-screen min-w-full bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800 p-6">
            <div className="container mx-auto max-w-8xl flex flex-row gap-6">
                <div className="w-1/4 p-4 rounded-xl bg-white shadow-md border border-gray-200">
                    <SelectionDetail record={record} />
                </div>
                <div className="w-3/4 p-4 rounded-xl bg-white shadow-md border border-gray-200 relative">
                    {loading ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/60 rounded-lg">
                            <div className="flex flex-col items-center">
                                <svg className="animate-spin h-10 w-10 text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                </svg>
                                <span className="mt-2 text-white text-lg">Generating Code...</span>
                            </div>
                        </div>
                    ) : (
                        <CodeEditor
                            generatedCode={generatedCode}
                            id={id}
                            codeReady={codeReady}
                            runagain={getCodeData}
                        />
                    )}
                </div>
            </div>
        </div>

    );

};

export default Page;