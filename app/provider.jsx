"use client"

import React, { useState, useEffect } from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import Header from '@/components/custom/Header'
import MessagesContext from '@/context/MessagesContext'
import UserContext from '@/context/UserContext';
import { SidebarProvider } from "@/components/ui/sidebar"
import AppSidebar from "@/components/custom/AppSidebar"
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useConvex } from 'convex/react'
import { api } from '@/convex/_generated/api'
import ActionContext from '@/context/ActionContext'
import { useRouter } from 'next/navigation'

const Provider = ({ children }) => {

    const router = useRouter();

    // const [message, setmessage] = useState();
    const [message, setmessage] = useState({ messages: [] });
    const [user, setUser] = useState();
    const [action, setAction] = useState();
    const convex = useConvex();

    useEffect(() => {
        isUserAuthenticated();
    }, []);


    const isUserAuthenticated = async () => {
        if (typeof window !== 'undefined') {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                const result = await convex.query(api.users.GetUser, { email: user.email });
                console.log(result);
                setUser(result);
            } else {
                router.push("/");
            }
        }
    }

    return (
        <div>
            <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID}>
                <UserContext.Provider value={{ user, setUser }}>
                    <MessagesContext.Provider value={{ message, setmessage }}>
                        <ActionContext.Provider value={{ action, setAction }}>
                            <NextThemesProvider
                                attribute="class"
                                defaultTheme="dark"
                                enableSystem
                                disableTransitionOnChange
                            >
                                <Header />
                                <SidebarProvider defaultOpen={false}>
                                    <AppSidebar />
                                    {children}
                                </SidebarProvider>
                            </NextThemesProvider>
                        </ActionContext.Provider>
                    </MessagesContext.Provider>
                </UserContext.Provider>
            </GoogleOAuthProvider>
        </div >
    )
}

export default Provider