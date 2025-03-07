import { LogOut, Settings, Wallet } from 'lucide-react'
import React, { useState, useContext } from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { useSidebar } from '../ui/sidebar'
import UserContext from '@/context/UserContext';
import Logout from './Logout'
import Signin from './Signin'

const SidebarFooter = () => {

    const router = useRouter();
    const { user, setUser } = useContext(UserContext);
    const { toggleSidebar } = useSidebar();
    const [openDialogue, setOpenDialogue] = useState(false);
    const [openoutDialogue, setOpenoutDialogue] = useState(false);

    const options = [
        {
            name: 'Setting',
            icon: Settings
        },

        {
            name: 'Subscription',
            icon: Wallet,
            path: '/pricing'
        },

        {
            name: user ? 'Logout' : 'Sign In',
            icon: LogOut
        }
    ]

    const routetoPricing = (option) => {
        router.push(option.path);
        toggleSidebar();
    }

    const handleClick = () => {
        if (!user?.name) {
            setOpenDialogue(true);
        } else {
            setOpenDialogue(false);
        }
    }

    const handleLogout = () => {
        if (user) {
            setOpenoutDialogue(true);
        } else {
            setOpenoutDialogue(false);
        }
    };


    return (

        <div className='mb-2'>
            {options.map((option, index) => {
                return (
                    <Button key={index} variant="ghost" className="w-full justify-start" onClick={
                        option.name === 'Subscription'
                            ? () => routetoPricing(option)
                            : option.name === 'Logout'
                                ? () => handleLogout()
                                : option.name === 'Sign In'
                                    ? () => handleClick()
                                    : undefined
                    }>
                        <option.icon className="mr-2 h-4 w-4" />
                        <span>{option.name}</span>
                    </Button>
                )
            })}

            <Signin openDialogue={openDialogue} closeDialogue={() => setOpenDialogue(false)} />
            <Logout openoutDialogue={openoutDialogue} closeDialogue={() => setOpenoutDialogue(false)} />

        </div>

    )
}

export default SidebarFooter