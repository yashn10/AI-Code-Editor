import React, { useContext, useState, useEffect } from 'react'
import { Button } from "@/components/ui/button";
import UserContext from '@/context/UserContext';
import Link from 'next/link';
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Signin from './Signin';
import Logout from './Logout';


const Header = () => {

  const { setTheme } = useTheme()
  const { user, setUser } = useContext(UserContext);
  const [openDialogue, setOpenDialogue] = useState(false);
  const [openoutDialogue, setOpenoutDialogue] = useState(false);


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

    <div className='flex items-center p-4' style={{ justifyContent: "space-around" }}>
      <Link href={'/'} className='cursor-pointer text-xl font-bold' style={{ color: "#af00af" }}>CodeCanvas AI</Link>

      <div className='flex gap-5'>
        <Link href={'/Home'} className='cursor-pointer'>Home</Link>
        <Link href={'/About'} className='cursor-pointer'>About</Link>
        <Link href={'/Contact'} className='cursor-pointer'>Contact</Link>
        <Link href={'/Feedback'} className='cursor-pointer'>Feedback</Link>
      </div>


      <div className='gap-2 flex'>
        <Link href={'/Main'} className='cursor-pointer'>
          <Button variant="outline">New Project</Button>
        </Link>
        {user ? (
          // If a user is logged in, show Logout button
          <Button variant="outline" onClick={handleLogout}>Logout</Button>
        ) : (
          // If no user, show Sign In button
          <Button variant="outline" onClick={handleClick}>Sign In</Button>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Signin openDialogue={openDialogue} closeDialogue={() => setOpenDialogue(false)} />
      <Logout openoutDialogue={openoutDialogue} closeDialogue={() => setOpenoutDialogue(false)} />

    </div>

  )
}

export default Header