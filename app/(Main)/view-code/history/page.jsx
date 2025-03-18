"use client"

import React, { useContext, useEffect, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ImageIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import UserContext from '@/context/UserContext';


const page = () => {

    const { user, setUser } = useContext(UserContext);
    const router = useRouter();
    const convex = useConvex();
    const [loading, setLoading] = useState(true);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        user && getHistory();
    }, [user])


    const getHistory = async () => {
        setLoading(true);
        try {
            const response = await convex.query(api.wireframeToCode.GetWireframeToCodeByUser, { user: user._id });
            console.log(response);
            setHistory(response);
        } catch (error) {
            console.error("Error fetching history:", error);
        } finally {
            setLoading(false);
        }
    };


    const visitWireframe = (id) => {
        router.push(`/view-code/${id}`);
    }


    return (

        <div className='max-w-5xl mx-auto py-10' style={{ width: "100%" }}>
            <h1 className='text-2xl m-5 font-bold text-gray-900 dark:text-gray-400'>Your Wireframes History</h1>
            <div className='grid grid-cols-3 gap-4'>
                {loading ? (
                    // Display multiple skeleton cards while loading
                    <>
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className="flex flex-col space-y-3 m-2">
                                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-[250px]" />
                                    <Skeleton className="h-4 w-[200px]" />
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    // Once loaded, map over the history items
                    history.map((item, index) => (
                        <div key={index} className='m-1'>
                            <Card className="light:bg-white light:shadow-lg border light:border-gray-200 dark:border-gray-700">
                                <CardHeader>
                                    <Image
                                        className='rounded'
                                        src={item.imageURL}
                                        alt="Wireframe Image"
                                        width={300}
                                        height={200}
                                    />
                                </CardHeader>
                                <CardContent>
                                    <p className='text-gray-900 dark:text-gray-400 text-sm'>
                                        {item.prompt ? item.prompt : "No prompt found for this wireframe"}
                                    </p>
                                </CardContent>
                                <CardFooter className='flex justify-between items-center'>
                                    <div className='text-sm text-center'>
                                        <h1 className='font-bold text-gray-900 dark:text-gray-400'>Model Used:</h1>
                                        <p className='text-pink-600 text-sm ml-1'>{item.model}</p>
                                    </div>
                                    <div>
                                        <Button onClick={() => visitWireframe(item._id)}>
                                            <ImageIcon className='mr-1' />View Code
                                        </Button>
                                    </div>
                                </CardFooter>
                            </Card>
                        </div>
                    ))
                )}
            </div>
        </div>

    )

}

export default page