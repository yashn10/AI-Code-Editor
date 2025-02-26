import { LogOut, Settings, Wallet } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { useSidebar } from '../ui/sidebar'

const SidebarFooter = () => {

    const router = useRouter();
    const { toggleSidebar } = useSidebar();

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
            name: 'Logout',
            icon: LogOut
        }
    ]

    const routetoPricing = (option) => {
        router.push(option.path);
        toggleSidebar();
    }

    return (

        <div className='mb-2'>
            {options.map((option, index) => {
                return (
                    <Button key={index} variant="ghost" className="w-full justify-start" onClick={option.name === 'Subscription' ? () => routetoPricing(option) : undefined}>
                        <option.icon className="mr-2 h-4 w-4" />
                        <span>{option.name}</span>
                    </Button>
                )
            })}
        </div>

    )
}

export default SidebarFooter